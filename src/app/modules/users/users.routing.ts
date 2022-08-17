import { Route } from '@angular/router';
import { UsersComponent } from 'app/modules/users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
// import { AddUserComponent } from './add-user/add-user.component';

// export const usersRoutes: Route[] = [
//     {
//         path: '',
//         component: UsersComponent,
//         children: [
//             {
//                 path: 'add',
//                 // component: AddUserComponent
//                 loadChildren: () => import('./add-user/adduser.module').then(module => module.AddUsersModule)
//             }
//         ]
//     }

// ]

export const usersRoutes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        // children: [
        //     {
        //         path: 'add',
        //         component: AddUserComponent
        //     }
        // ]
    }
];
