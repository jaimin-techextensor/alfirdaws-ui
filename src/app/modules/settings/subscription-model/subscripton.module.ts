import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SubscriptionModelComponent } from './subscription-model.component';
import { AddSubscriptionModelComponent } from './add-subscription-model/add-subscription-model.component';


const subscriptModelRought: Route[] = [
  { path: "", component: SubscriptionModelComponent },
  { path: "add-subscription", component: AddSubscriptionModelComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(subscriptModelRought)
  ]
})
export class SubscriptonModule { }
