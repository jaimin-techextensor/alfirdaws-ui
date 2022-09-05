import { Route } from '@angular/router';
import { CountriesComponent } from './countries.component';
//import { AddCategoryComponent } from './add-category/add-category.component';
//import { AddSubCategoryComponent } from './add-subcategory/add-subcategory.component';


export const countriesRoutes: Route[] = [
    {
        path: '',
        component: CountriesComponent
    },
   /* {
        path: 'add-category',
        component: AddCategoryComponent
    },
    {
        path: 'edit-category/:categoryId',
        component: AddCategoryComponent
    },
    {
        path: 'edit-category/:categoryId/add-subcategory',
        component: AddSubCategoryComponent
    },
    {
        path: 'edit-category/:categoryId/edit-subcategory/:subcategoryId',
        component: AddSubCategoryComponent
    }*/
];
