import { spawn } from 'node:child_process';

const PORT = process.env.TEST_PORT || '3011';
const BASE = `http://127.0.0.1:${PORT}`;
let passed = 0;
let failed = 0;

function check(name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`PASS  ${name}`);
  } else {
    failed++;
    console.log(`FAIL  ${name}${detail ? ` -> ${detail}` : ''}`);
  }
}

async function json(path, options) {
  const res = await fetch(`${BASE}${path}`, options);
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body };
}

async function waitForHealth(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

const server = spawn('npx', ['tsx', 'src/server.ts'], {
  cwd: new URL('../backend', import.meta.url).pathname,
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverLog = '';
server.stdout.on('data', (d) => { serverLog += d.toString(); });
server.stderr.on('data', (d) => { serverLog += d.toString(); });

try {
  const healthy = await waitForHealth();
  check('server starts and health endpoint responds', healthy, serverLog.slice(-500));
  if (!healthy) throw new Error('server did not start');

  // 1. Missing password must not authenticate (previous critical bypass).
  const noPassword = await json('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'manager@doormasterops.com' }),
  });
  check('rejects sign-in without a password', noPassword.status === 400 && !noPassword.body?.token, JSON.stringify(noPassword.body));

  // 2. Wrong password gets a generic 401.
  const wrong = await json('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'manager@doormasterops.com', password: 'definitely-wrong' }),
  });
  check('rejects wrong password with 401', wrong.status === 401 && wrong.body?.success === false, JSON.stringify(wrong.body));
  check('does not disclose whether the account exists', wrong.body?.message === 'Invalid email or password.', wrong.body?.message);

  // 3. Correct credentials issue a token and user payload.
  const good = await json('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'manager@doormasterops.com', password: 'DoorMaster2026!*' }),
  });
  check('accepts valid credentials', good.status === 200 && good.body?.success === true && !!good.body?.token, JSON.stringify(good.body).slice(0, 200));
  const managerToken = good.body?.token;
  check('token is a three-part JWT', typeof managerToken === 'string' && managerToken.split('.').length === 3);

  // 4. /me validates the token.
  const me = await json('/api/auth/me', { headers: { Authorization: `Bearer ${managerToken}` } });
  check('/api/auth/me returns the current user', me.status === 200 && me.body?.user?.role === 'manager', JSON.stringify(me.body));
  check('/api/auth/me never returns a password hash', !JSON.stringify(me.body).toLowerCase().includes('passwordhash'));

  // 5. User directory requires auth.
  const usersNoToken = await json('/api/auth/users');
  check('user directory requires authentication', usersNoToken.status === 401, String(usersNoToken.status));
  const usersWithToken = await json('/api/auth/users', { headers: { Authorization: `Bearer ${managerToken}` } });
  check('manager can list users with a token', usersWithToken.status === 200 && Array.isArray(usersWithToken.body?.users), String(usersWithToken.status));

  // 6. Forged token is rejected.
  const forged = await json('/api/auth/me', { headers: { Authorization: `Bearer ${managerToken.slice(0, -2)}aa` } });
  check('rejects a forged token signature', forged.status === 401, String(forged.status));

  // 7. Non-manager cannot create users.
  const installerLogin = await json('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'm.vance@doormasterops.com', password: 'DoorMaster2026!*' }),
  });
  const installerToken = installerLogin.body?.token;
  const forbidden = await json('/api/auth/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${installerToken}` },
    body: JSON.stringify({ name: 'Nope', email: `nope-${Date.now()}@example.com`, role: 'installer' }),
  });
  check('non-manager cannot create users (403)', forbidden.status === 403, String(forbidden.status));

  // 8. Deactivation revokes an existing token immediately.
  const tempEmail = `temp-${Date.now()}@example.com`;
  const tempPassword = 'TempPass123!';
  const created = await json('/api/auth/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${managerToken}` },
    body: JSON.stringify({ name: 'Temp Tech', email: tempEmail, role: 'installer', password: tempPassword }),
  });
  const tempId = created.body?.user?.id;
  check('manager can create a user', created.status === 201 && !!tempId, JSON.stringify(created.body));

  const tempLogin = await json('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: tempEmail, password: tempPassword }),
  });
  const tempToken = tempLogin.body?.token;
  check('new user can sign in', tempLogin.status === 200 && !!tempToken, JSON.stringify(tempLogin.body));

  const tempMeBefore = await json('/api/auth/me', { headers: { Authorization: `Bearer ${tempToken}` } });
  check('new user token works before deactivation', tempMeBefore.status === 200, String(tempMeBefore.status));

  const deactivated = await json(`/api/auth/users/${tempId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${managerToken}` },
    body: JSON.stringify({ status: 'deactivated' }),
  });
  check('manager can deactivate a user', deactivated.status === 200, JSON.stringify(deactivated.body));

  const tempMeAfter = await json('/api/auth/me', { headers: { Authorization: `Bearer ${tempToken}` } });
  check('deactivation revokes an existing token', tempMeAfter.status === 401, String(tempMeAfter.status));

  const removed = await json(`/api/auth/users/${tempId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${managerToken}` },
  });
  check('manager can delete the test user', removed.status === 200, JSON.stringify(removed.body));

  // 9. Operational mutations now require a session.
  const jobNoToken = await json('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  check('job mutation requires authentication', jobNoToken.status === 401, String(jobNoToken.status));

  const notifNoToken = await json('/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  check('notification mutation requires authentication', notifNoToken.status === 401, String(notifNoToken.status));

  // 10. Validation and rate limiting on a throwaway email.
  const shortPassword = await json('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Short Pass', email: `short-${Date.now()}@example.com`, role: 'installer', password: '1234567' }),
  });
  check('rejects passwords shorter than 8 characters', shortPassword.status === 400, JSON.stringify(shortPassword.body));

  let lastStatus = 0;
  const rateEmail = `ratelimit-${Date.now()}@example.com`;
  for (let i = 0; i < 12; i++) {
    const res = await json('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: rateEmail, password: 'wrong-password' }),
    });
    lastStatus = res.status;
  }
  check('rate limits repeated sign-in attempts (429)', lastStatus === 429, String(lastStatus));

  console.log(`\n${passed} passed, ${failed} failed`);
} catch (err) {
  failed++;
  console.error('SMOKE TEST ERROR', err);
  console.error(serverLog.slice(-2000));
} finally {
  server.kill('SIGTERM');
  setTimeout(() => {
    try { server.kill('SIGKILL'); } catch { /* already gone */ }
    process.exit(failed === 0 ? 0 : 1);
  }, 600);
}
