import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'app/modules/settings/users/users.component';
import { usersRoutes } from 'app/modules/settings/users/users.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { authSignInRoutes } from 'app/modules/auth/sign-in/sign-in.routing';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent
    ],
    imports: [
        RouterModule.forChild(usersRoutes),
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSortModule,
        MatPaginatorModule,
        // RouterModule.forChild(authSignInRoutes),
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ],
    exports:[
        AddUserComponent
    ]
})

export class UsersModule { }