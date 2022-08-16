import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'app/modules/users/users.component';
import { usersRoutes } from 'app/modules/users/users.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        UsersComponent    
    ],
    imports : [
        RouterModule.forChild(usersRoutes),
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSortModule,
        MatPaginatorModule
    ]
})

export class UsersModule {}