import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        DashboardComponent,
        CustomerComponent,
        SubscriptionComponent,
        AdvertisementComponent,
        CampaignsComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleModule
{
}
