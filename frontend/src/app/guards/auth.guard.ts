import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InstallationStore } from '../services/installation.store';

/**
 * Blocks the dashboard shell when there is no valid session and sends the
 * visitor to sign-in, preserving the attempted URL for post-login redirect.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const store = inject(InstallationStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/signin'], {
    queryParams: { returnUrl: state.url },
  });
};

/**
 * Keeps signed-in users away from the sign-in page.
 */
export const guestGuard: CanActivateFn = () => {
  const store = inject(InstallationStore);
  const router = inject(Router);

  if (!store.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/overview']);
};
