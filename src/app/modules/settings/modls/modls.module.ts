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
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { ModlsService } from 'app/service/modls.services';
import { ModlsComponent } from "app/modules/settings/modls/modls.component";
import { modlsRoutes } from 'app/modules/settings/modls/modls.routing';


@NgModule({
    declarations: [
        ModlsComponent,

    ],
    imports: [
        RouterModule.forChild(modlsRoutes),
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
        FuseCardModule,
        FuseAlertModule,
        SharedModule,
        MatTableModule
    ],
   /* exports: [
        AddRoleComponent
    ],*/
    providers: [
        ModlsService
    ]
    
})

export class ModlsModule { }