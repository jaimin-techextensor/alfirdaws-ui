import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from "./dashboard.component";
import { dashboardRoutes } from "./dashboard.routing";

@NgModule({
    declarations: [DashboardComponent],
    imports:[
        RouterModule.forChild(dashboardRoutes),
        SharedModule
    ]
})
export class DashboardModule {}