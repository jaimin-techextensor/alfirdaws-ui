import { Route } from '@angular/router';
import { CountriesComponent } from './countries.component';
import { AddCountryComponent } from './add-country/add-country.component';


export const countriesRoutes: Route[] = [
    {
        path: '',
        component: CountriesComponent
    },
    {
        path: 'add-country',
        component: AddCountryComponent
    },
    {
        path: 'edit-country/:countryId',
        component: AddCountryComponent
    },/*
    {
        path: 'edit-category/:categoryId/add-subcategory',
        component: AddSubCategoryComponent
    },
    {
        path: 'edit-category/:categoryId/edit-subcategory/:subcategoryId',
        component: AddSubCategoryComponent
    }*/
];
