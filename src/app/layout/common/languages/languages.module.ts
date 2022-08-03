import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { SharedModule } from 'app/shared/shared.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { SearchModule } from '../search/search.module';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [
        LanguagesComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        NotificationsModule,
        SearchModule,
        UserModule
    ],
    exports     : [
        LanguagesComponent
    ]
})
export class LanguagesModule
{
}
