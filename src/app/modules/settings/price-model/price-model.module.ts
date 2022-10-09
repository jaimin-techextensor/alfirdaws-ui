import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PriceModelComponent } from "./price-model.component";
import { Route, RouterModule } from '@angular/router';
import { AddPriceModelComponent } from './add-price-model/add-price-model.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

const priceModelRoutes: Route[] = [
    {
        path: "", component: PriceModelComponent
    },
    {
        path: "add-price-model", component: AddPriceModelComponent
    },
    {
        path: "edit-price-model/:pricingModelId", component: AddPriceModelComponent
    }
] 

@NgModule({
    declarations: [
        PriceModelComponent,
        AddPriceModelComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(priceModelRoutes),
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

export class PriceModule { }