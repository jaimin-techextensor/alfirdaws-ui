import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule} from '@angular/material/tabs';
import { MatBadgeModule} from '@angular/material/badge'
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { CategoriesService } from 'app/service/categories.service';
import { CategoriesComponent } from "app/modules/settings/categories/categories.component";
import { categoriesRoutes } from 'app/modules/settings/categories/categories.routing';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-subcategory/add-subcategory.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DetailCategoryComponent } from 'app/modules/settings/categories/detail-category/detail-category.component';


@NgModule({
    declarations: [
        CategoriesComponent,
        AddCategoryComponent,
        AddSubCategoryComponent,
        DetailCategoryComponent
    ],
    imports: [
        RouterModule.forChild(categoriesRoutes),
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatBadgeModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatTableModule,
        MatSidenavModule
    ],
    exports: [
        AddCategoryComponent,
        AddSubCategoryComponent
    ],
    providers: [
        CategoriesService
    ]
    
})

export class CategoriesModule { }