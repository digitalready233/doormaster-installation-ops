import { LandingPage } from './views/landing-page/landing-page';
import { SignIn } from './views/sign-in/sign-in';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { Overview } from './views/overview/overview';
import { DoorsCatalog } from './views/doors-catalog/doors-catalog';
import { InstallerPortal } from './views/installer-portal/installer-portal';
import { ClientPortal } from './views/client-portal/client-portal';
import { ShopPortal } from './views/shop-portal/shop-portal';
import { DispatcherPortal } from './views/dispatcher-portal/dispatcher-portal';
import { PerformanceDashboard } from './views/performance-dashboard/performance-dashboard';
import { FinancePortal } from './views/finance-portal/finance-portal';
import { RolesManager } from './views/roles-manager/roles-manager';
import { Settings } from './views/settings/settings';
export const routes = [
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
        title: 'Sign In - DoorMaster Operations Hub'
    },
    {
        path: '',
        component: DashboardLayout,
        children: [
            {
                path: 'overview',
                component: Overview,
                title: 'Dashboard - DoorMaster'
            },
            {
                path: 'doors',
                component: DoorsCatalog,
                title: 'Doors Catalog & Registry - DoorMaster'
            },
            {
                path: 'installer',
                component: InstallerPortal,
                title: 'Technician Field Operations - DoorMaster'
            },
            {
                path: 'client',
                component: ClientPortal,
                title: 'Client Live Tracking - DoorMaster'
            },
            {
                path: 'shop',
                component: ShopPortal,
                title: 'Shop & Counter - DoorMaster'
            },
            {
                path: 'dispatcher',
                component: DispatcherPortal,
                title: 'Logistics Fleet Dispatch - DoorMaster'
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
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'landing'
    }
];
