import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { SettingsComponent } from 'app/modules/settings/settings.component';
import { settingRoutes } from 'app/modules/settings/settings.routing';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        SettingsComponent    
    ],
    imports : [
        RouterModule.forChild(settingRoutes),
        MatIconModule,
        TranslocoCoreModule
    ]
})

export class SettingsModule {}