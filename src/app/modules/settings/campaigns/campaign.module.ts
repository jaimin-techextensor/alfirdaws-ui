import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge'
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { CampaignTypeComponent } from './campaign-type/campaign-type.component';
import { CampaignsComponent } from './campaigns.component';
import { PeriodTypeComponent } from './period-type/period-type.component';
import { ReachTypeComponent } from './reach-type/reach-type.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { MatTooltipModule } from '@angular/material/tooltip';
const campaignRoute: Route[] = [
  {
    path: '',
    component: CampaignsComponent,
  },
  { path: 'reach-type', component: ReachTypeComponent },
  { path: 'campaign-type', component: CampaignTypeComponent },
  { path: 'period-type', component: PeriodTypeComponent },
  { path: 'add-campaign', component: AddCampaignComponent },
  { path: 'edit-campaign/:campaignId', component: AddCampaignComponent }
];

@NgModule({
  declarations: [
    CampaignTypeComponent,
    PeriodTypeComponent,
    ReachTypeComponent,
    CampaignsComponent,
    AddCampaignComponent
  ],
  imports: [
    RouterModule.forChild(campaignRoute),
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class CampaignsModule { }
