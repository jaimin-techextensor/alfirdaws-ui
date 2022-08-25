import { Route } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddRoleComponent } from './add-role/add-role.component';


export const rolesRoutes: Route[] = [
    {
        path: '',
        component: RolesComponent
    },
    {
        path: 'add-role',
        component: AddRoleComponent
    },
    /*
    {
        path: 'edit-user/:userId',
        component: AddUserComponent
    }*/
];
