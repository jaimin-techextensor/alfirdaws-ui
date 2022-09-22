import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CampaignService } from 'app/service/campaign.service';
import { SettingService } from 'app/service/setting.service';
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  dataSource: any;
  displayedColumns = [
    "Type",
    "Reach",
    "period",
    "Days",
    "price",
    "discountPercentage",
    "netPrice",
    "IsActive",
    "Action"
  ];
  campaginsList: any = [];
  dataSource1: any;
  counterData: any;

  constructor(
    private _location: Location,
    private campaignService: CampaignService,
    private _router: Router,
    private settingService: SettingService
  ) {
    var counters = localStorage.getItem("counter-data");
    if (counters) {
      counters = JSON.parse(counters);
      this.counterData = counters;
    } else {
      this.getCounters();
    }
  }

  ngOnInit(): void {
    this.campaignService.getCampaginsList().subscribe(data => {
      if (data.success == true) {
        this.campaginsList = data.data;
        this.dataSource = new MatTableDataSource(this.campaginsList);
      }

    })
  }

  navigateBack() {
    this._location.back();
  }

  navigateToCampaignType() {
    this._router.navigateByUrl("campaigns/campaign-type");
  }

  navigateToReachType() {
    this._router.navigateByUrl("campaigns/reach-type");
  }

  navigateToPeriodType() {
    this._router.navigateByUrl("campaigns/period-type");
  }

  deleteCampaign(id: string) {
    this.campaignService.deleteCampaginByUser(id).subscribe(data => {
      if (data.success == true) {
        const index = this.campaginsList.findIndex(a => a.campaignId == id);
        if (index >= 0) {
          this.campaginsList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.campaginsList);
        }
      }
    })
  }

  editCampaigns(id: string) {
    this._router.navigateByUrl("campaigns/edit-campaign/" + id);

  }

  getCounters() {
    this.settingService.getCounters().subscribe(res => {
      if (res.success == true) {
        this.counterData = res.data;
        localStorage.setItem("counter-data", JSON.stringify(this.counterData));
      }
    })
  }
}
