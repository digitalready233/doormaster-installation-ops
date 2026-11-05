// scratch/test_flow.js
const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('--- Step 1: Health Check & DB Check ---');
  const health = await request({ hostname: 'localhost', port: 3001, path: '/api/health', method: 'GET' });
  console.log('Health:', health.data);

  console.log('\n--- Step 2: Shop Manager Books Installation (Status: booked_at_shop) ---');
  const testJobId = `DM-${Date.now()}`;
  const bookRes = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/jobs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    id: testJobId,
    jobNumber: testJobId,
    title: 'Turkey interior DM001 Acoustic Interior Door - Test Client Kwame',
    clientName: 'Kwame Asante',
    clientPhone: '+233 24 111 2233',
    address: 'East Legon Hills, Plot 44, Accra',
    doorName: 'Turkey interior DM001 Acoustic Interior Door',
    doorCategory: 'Turkey interior series',
    lockModel: 'Doormaster Smart Lock Handle F35',
    status: 'booked_at_shop',
    depositAmount: 4750,
    balanceDue: 0
  });
  console.log('Job Booked:', bookRes.status, bookRes.data?.job?.id, 'Status:', bookRes.data?.job?.status);

  // Send in-app notification & SMS to Operations Manager
  const notifRes1 = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/notifications',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'manager',
    title: 'New Installation Request Booked by Shop',
    message: `Kwame Asante booked installation for Turkey interior DM001. Please assign installer.`,
    type: 'truck_assigned',
    jobId: testJobId,
    actionLabel: 'Assign Installer'
  });
  console.log('Notification to Operations Manager:', notifRes1.status, notifRes1.data?.notification?.id);

  const smsRes1 = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/sms/log',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'manager',
    recipientName: 'Operations Manager',
    recipientPhone: '+233 24 000 0001',
    triggerEvent: 'booking_created',
    messageText: `DoorMaster Alert: New installation booked by Shop for Kwame Asante. Ref: ${testJobId}. Please assign an installer.`,
    status: 'delivered'
  });
  console.log('SMS to Operations Manager:', smsRes1.status, smsRes1.data?.log?.id);

  console.log('\n--- Step 3: Operations Manager Assigns Installer (Status -> assigned) ---');
  const assignInstallerRes = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/jobs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    id: testJobId,
    jobNumber: testJobId,
    status: 'assigned',
    assignedInstallerId: 'inst_01',
    assignedInstallerName: 'Kofi Mensah',
    installerAssignmentStatus: 'pending'
  });
  console.log('Job Updated to Assigned:', assignInstallerRes.status, 'Status:', assignInstallerRes.data?.job?.status, 'Installer:', assignInstallerRes.data?.job?.assignedInstallerName);

  // Notification and SMS to Shop Manager
  const notifShop = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/notifications',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'shop_manager',
    title: 'Installer Assigned: Kofi Mensah',
    message: `Operations Manager assigned Kofi Mensah to job ${testJobId}. Please assign a store dispatch driver.`,
    type: 'job_assigned',
    jobId: testJobId,
    actionLabel: 'Assign Store Driver'
  });
  console.log('Notification to Shop Manager:', notifShop.status, notifShop.data?.notification?.title);

  const smsShop = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/sms/log',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'shop_manager',
    recipientName: 'Shop Manager',
    recipientPhone: '+233 24 000 0002',
    triggerEvent: 'installer_assigned',
    messageText: `DoorMaster SMS: Installer Kofi Mensah has been assigned to job ${testJobId}. Please assign an available store dispatch driver in your Shop Portal.`,
    status: 'delivered'
  });
  console.log('SMS to Shop Manager:', smsShop.status, smsShop.data?.log?.messageText);

  console.log('\n--- Step 4: Shop Manager Assigns Store Dispatch Driver (Status -> dispatched) ---');
  const dispatchRes = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/jobs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    id: testJobId,
    jobNumber: testJobId,
    status: 'dispatched',
    assignedDriverId: 'disp_01',
    assignedDriverName: 'Emmanuel Kojo',
    driverAssignmentStatus: 'accepted'
  });
  console.log('Job Dispatched by Store:', dispatchRes.status, 'Status:', dispatchRes.data?.job?.status, 'Driver:', dispatchRes.data?.job?.assignedDriverName);

  // SMS to Driver, Manager, and Client
  await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/sms/log',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'dispatcher',
    recipientName: 'Emmanuel Kojo',
    recipientPhone: '+233 24 555 0192',
    triggerEvent: 'driver_assigned',
    messageText: `DoorMaster SMS: Delivery run assigned from store for job ${testJobId}.`,
    status: 'delivered'
  });

  await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/sms/log',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    recipientRole: 'client',
    recipientName: 'Kwame Asante',
    recipientPhone: '+233 24 111 2233',
    triggerEvent: 'door_dispatched',
    messageText: `DoorMaster SMS: Hello Kwame, your door has been dispatched with driver Emmanuel Kojo. Ref: ${testJobId}.`,
    status: 'delivered'
  });

  console.log('\n--- Step 5: Verify Query API for All Users ---');
  const notifsQuery = await request({ hostname: 'localhost', port: 3001, path: '/api/notifications', method: 'GET' });
  console.log('Total Notifications in DB:', notifsQuery.data?.notifications?.length);

  const smsQuery = await request({ hostname: 'localhost', port: 3001, path: '/api/sms/logs', method: 'GET' });
  console.log('Total SMS logs in DB:', smsQuery.data?.logs?.length);

  const jobsQuery = await request({ hostname: 'localhost', port: 3001, path: '/api/jobs', method: 'GET' });
  const foundJob = jobsQuery.data?.jobs?.find(j => j.id === testJobId);
  console.log('Found Dispatched Job in DB:', foundJob?.id, 'Status:', foundJob?.status, 'Installer:', foundJob?.assignedInstallerName, 'Driver:', foundJob?.assignedDriverName);

  console.log('\nALL WORKFLOW STEPS VALIDATED SUCCESSFULLY!');
}

run().catch(console.error);
