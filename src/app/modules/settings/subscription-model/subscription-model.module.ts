import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddSubscriptionModelComponent } from './add-subscription-model/add-subscription-model.component';
import { SubscriptionModelComponent } from './subscription-model.component';

const subscriptModelRought: Route[] = [
  { path: "", component: SubscriptionModelComponent },
  { path: "add-subscription-model", component: AddSubscriptionModelComponent },
  { path: "edit-subscription-modal/:subscriptionModelId", component: AddSubscriptionModelComponent }
]

@NgModule({
  declarations: [
    SubscriptionModelComponent,
    AddSubscriptionModelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(subscriptModelRought),
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    SharedModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
})

export class SubscriptonModelModule { }
