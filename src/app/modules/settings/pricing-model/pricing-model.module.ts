import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AddPricingModelComponent } from './add-pricing-model/add-pricing-model.component';
import { PricingModelComponent } from "./pricing-model.component";

const pricingModelRoutes: Route[] = [
    {
        path: "", component: PricingModelComponent
    },
    {
        path: "add-pricing-model", component: AddPricingModelComponent
    },
    {
        path: "edit-pricing-model/:pricingModelId", component: AddPricingModelComponent
    }
] 

@NgModule({
    declarations: [
        PricingModelComponent,
        AddPricingModelComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(pricingModelRoutes),
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        MatMenuModule
    ]
})

export class PricingModule { }