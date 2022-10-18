import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseCategoryComponent } from './case-category.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

const caseCategoryRoute: Route[] = [
  { path: '', component: CaseCategoryComponent }
]
@NgModule({
  declarations: [
    CaseCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(caseCategoryRoute),
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
export class CaseCategoryModule { }
