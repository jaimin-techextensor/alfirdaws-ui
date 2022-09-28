import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeComponent } from './payment-type.component';
import { Route, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';1

const paymentTypeRoute: Route[] = [
  { path: '', component: PaymentTypeComponent }
]

@NgModule({
  declarations: [
    PaymentTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(paymentTypeRoute),
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBadgeModule,
    FuseCardModule,
    SharedModule,
    MatTableModule
  ]
})

export class PaymentTypeModule { }
