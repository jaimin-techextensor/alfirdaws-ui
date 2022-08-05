import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from 'app/modules/settings/settings.component';
import { settingRoutes } from 'app/modules/settings/settings.routing';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports : [
        RouterModule.forChild(settingRoutes)
    ]
})

export class SettingsModule {}