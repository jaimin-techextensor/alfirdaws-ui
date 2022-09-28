import { Route } from '@angular/router';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'sign-in', title: 'Login' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard', title: 'Home' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'example', title: 'Home', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
            { path: 'settings', title: 'Setting', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/settings.module').then(m => m.SettingsModule) },
            { path: 'users', title: 'Users', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/users/users.module').then(m => m.UsersModule) },
            { path: 'roles', title: 'Roles', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/roles/roles.module').then(m => m.RolesModule) },
            { path: 'modules', title: 'Modules', loadChildren: () => import('app/modules/settings/modls/modls.module').then(m => m.ModlsModule) },
            { path: 'categories', title: 'Categories', loadChildren: () => import('app/modules/settings/categories/categories.module').then(m => m.CategoriesModule) },
            { path: 'countries', title: 'Countries', loadChildren: () => import('app/modules/settings/countries/countries.modules').then(m => m.CountriesModule) },
            { path: 'dashboard', title: 'Dashboard', loadChildren: () => import('app/modules/admin/example/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'campaigns', title: 'Campaigns', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/campaigns/campaign.module').then(m => m.CampaignsModule) },
            { path: 'subscription-model', title: 'Subscription Model', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/subscription-model/subscription-model.module').then(m => m.SubscriptonModelModule) },
            { path: 'address-type', title: 'Address Type', canLoad: [AuthGuard], loadChildren: () => import("app/modules/settings/address-type/address-type.module").then(m => m.AddressTypeModule) },
            { path: 'payment-type', title: 'Payment Type', canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/payment-type/payment-type.module').then(m => m.PaymentTypeModule) },
            { path: 'invoice-type', title: "Invoice Type", canLoad: [AuthGuard], loadChildren: () => import('app/modules/settings/invoice-type/invoice-type.module').then(m => m.InvoiceTypeModule) }
        ]
    }
];
