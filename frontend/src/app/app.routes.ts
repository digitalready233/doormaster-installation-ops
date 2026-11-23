import { Routes } from '@angular/router';
import { LandingPage } from './views/landing-page/landing-page';
import { SignIn } from './views/sign-in/sign-in';
import { SignUp } from './views/sign-up/sign-up';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Overview } from './views/overview/overview';
import { DoorsCatalog } from './views/doors-catalog/doors-catalog';
import { ShopPortal } from './views/shop-portal/shop-portal';
import { DeliveryMap } from './views/delivery-map/delivery-map';
import { PerformanceDashboard } from './views/performance-dashboard/performance-dashboard';
import { FinancePortal } from './views/finance-portal/finance-portal';
import { RolesManager } from './views/roles-manager/roles-manager';
import { Settings } from './views/settings/settings';
import { Profile } from './views/profile/profile';
import { Work } from './views/work/work';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingPage,
    title: 'DoorMaster Pro - Architectural Door Installation & Field Operations'
  },
  {
    path: 'signin',
    component: SignIn,
    canActivate: [guestGuard],
    title: 'Sign In - DoorMaster Operations Hub'
  },
  {
    path: 'signup',
    component: SignUp,
    canActivate: [guestGuard],
    title: 'Create Account - DoorMaster Operations Hub'
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        component: Overview,
        title: 'Dashboard - DoorMaster'
      },
      {
        path: 'doors',
        component: DoorsCatalog,
        title: 'Doors in Catalog - DoorMaster'
      },
      {
        path: 'installer',
        redirectTo: 'map',
        pathMatch: 'full'
      },
      {
        path: 'client',
        redirectTo: 'map',
        pathMatch: 'full'
      },
      {
        path: 'shop',
        component: ShopPortal,
        title: 'Shop & Counter - DoorMaster'
      },
      {
        path: 'map',
        component: DeliveryMap,
        title: 'Map - DoorMaster'
      },
      {
        path: 'performance',
        component: PerformanceDashboard,
        title: 'Incentive Bonuses - DoorMaster'
      },
      {
        path: 'finance',
        component: FinancePortal,
        title: 'Accounts Ledger - DoorMaster'
      },
      {
        path: 'roles',
        component: RolesManager,
        title: 'Roles & Permissions - DoorMaster'
      },
      {
        path: 'settings',
        component: Settings,
        title: 'Settings Hub & Shop Location - DoorMaster'
      },
      {
        path: 'profile',
        component: Profile,
        title: 'My Profile - DoorMaster Operations Hub'
      },
      {
        path: 'work',
        component: Work,
        title: 'Work Assignments - DoorMaster'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];
