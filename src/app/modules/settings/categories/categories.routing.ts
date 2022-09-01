import { Route } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-subcategory/add-subcategory.component';


export const categoriesRoutes: Route[] = [
    {
        path: '',
        component: CategoriesComponent
    },
    {
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
    }
];
