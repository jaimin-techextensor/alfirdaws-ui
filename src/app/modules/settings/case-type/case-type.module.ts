import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseTypeComponent } from './case-type.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

const caseTypeRoute: Route[] = [
  { path: "", component: CaseTypeComponent }
]

@NgModule({
  declarations: [
    CaseTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(caseTypeRoute),
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBadgeModule,
    SharedModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class CaseTypeModule { }
