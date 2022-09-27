import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AddressTypeComponent } from './address-type.component';

const addressTypeRought: Route[] = [
  { path: '', component: AddressTypeComponent }
];

@NgModule({
  declarations: [
    AddressTypeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(addressTypeRought),
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
    MatTableModule,
  ]
})
export class AddressTypeModule { }
