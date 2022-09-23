import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SubscriptionModelComponent } from './subscription-model.component';
import { AddSubscriptionModelComponent } from './add-subscription-model/add-subscription-model.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const subscriptModelRought: Route[] = [
  { path: "", component: SubscriptionModelComponent },
  { path: "add-subscription", component: AddSubscriptionModelComponent },
  { path: "edit-subscription/:subcriptionId", component: AddSubscriptionModelComponent }
]

@NgModule({
  declarations: [
    AddSubscriptionModelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(subscriptModelRought),
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatSlideToggleModule
  ]
})
export class SubscriptonModule { }
