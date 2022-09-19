import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { CustomerComponent } from './customer/customer.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        CustomerComponent,
        SubscriptionComponent,
        AdvertisementComponent,
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleModule
{
}
