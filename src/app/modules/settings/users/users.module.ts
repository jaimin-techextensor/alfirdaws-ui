import { NgModule } from '@angular/core';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { UsersComponent } from 'app/modules/settings/users/users.component';
import { usersRoutes } from 'app/modules/settings/users/users.routing';
import { UsersService } from 'app/service/users.service';
import { SharedModule } from 'app/shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent,
        DetailUserComponent,
        UserDetailDialogComponent
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
        MatTabsModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatTableModule,
        MatSelectModule,
        MatSidenavModule
    ],
    exports: [
        AddUserComponent
    ],
    providers: [
        UsersService
    ]
})

export class UsersModule { }