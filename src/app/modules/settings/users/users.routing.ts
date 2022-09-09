import { Route } from '@angular/router';
import { UsersComponent } from 'app/modules/settings/users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';

export const usersRoutes: Route[] = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'add-user',
        component: AddUserComponent
    },
    {
        path: 'edit-user/:userId',
        component: AddUserComponent
    },
    {
        path: 'userdetail',
        component: DetailUserComponent
    }
];
