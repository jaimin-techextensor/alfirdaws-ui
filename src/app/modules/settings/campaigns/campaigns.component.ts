import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { CampaignService } from 'app/service/campaign.service';
import { SettingService } from 'app/service/setting.service';
import { PageRequestModel } from '../users/page-request';
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
  campaignList: any = [];
  counterData: any;
  campaignsListModel: PageRequestModel = new PageRequestModel();
  searchTextForCampaign: any;
  sanitizer: any;
  isDeletePermission: boolean;
  isAddPermission: boolean;
  isEditPermission: boolean;

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
    this.getCampaignList(null, false);
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
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
    this.campaignService.deleteCampaignByUser(id).subscribe(data => {
      if (data.success == true) {
        const index = this.campaignList.findIndex(a => a.campaignId == id);
        if (index >= 0) {
          this.campaignList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.campaignList);
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

  getCampaignList(event: any, isSearch: boolean = false) {
    this.campaignsListModel.PageSize = event?.pageSize ? event.pageSize : this.campaignsListModel.PageSize;
    this.campaignsListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.campaignsListModel.PageNumber;
    if (isSearch) {
      if (this.searchTextForCampaign.length > 0 && this.searchTextForCampaign.length <= 2) {
        return;
      } else {
        this.campaignsListModel.SearchText = this.searchTextForCampaign ? this.searchTextForCampaign : null;
      }
    }
    else {
      this.campaignsListModel.SearchText = null;
    }
    this.campaignService.getCampaignsList(this.campaignsListModel.PageNumber, this.campaignsListModel.PageSize, this.campaignsListModel.SearchText).subscribe(res => {
      if (res.success == true) {
        if (res.pageInfo) {
          if (event?.pageIndex >= 0) {
            this.campaignsListModel.PageNumber = res.pageInfo.currentPage - 1;
          } else {
            this.campaignsListModel.PageNumber = res.pageInfo.currentPage;
          }
          this.campaignsListModel.PageSize = res.pageInfo.pageSize;
          this.campaignsListModel.TotalPages = res.pageInfo.totalPages;
          this.campaignsListModel.TotalCount = res.pageInfo.totalCount;
        }
        this.campaignList = res.data;
        this.dataSource = new MatTableDataSource(this.campaignList);
      }
      else {
        console.log("Data not found");
      }
    });
  }
}
