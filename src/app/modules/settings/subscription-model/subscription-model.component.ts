import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { SubscriptionModelService } from 'app/service/subscription-model.service';
import { PageRequestModel } from '../users/page-request';

@Component({
  selector: 'app-subscription-model',
  templateUrl: './subscription-model.component.html',
  styleUrls: ['./subscription-model.component.scss']
})

export class SubscriptionModelComponent implements OnInit {
  subscriptionList: any = []
  subscriptionListModel: PageRequestModel = new PageRequestModel();
  dataSource: any;
  searchTextForSubscription: string = null;
  displayedColumns = [
    "Name",
    "Type",
    "UserType",
    "Ads",
    "Pictures",
    "Active",
    "Action"
  ]
  isDeletePermission = false;
  isEditPermission = false;
  isAddPermission = false;

  constructor(
    private _router: Router,
    private _location: Location,
    private _subscriptionModelService: SubscriptionModelService,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.getSubscriptionModelList(null, false);
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
  }

  navigateBack() {
    this._location.back()
  }

  getSubscriptionModelList(event: any, isSearch: boolean = false) {
    this.subscriptionListModel.PageSize = event?.pageSize ? event.pageSize : this.subscriptionListModel.PageSize;
    this.subscriptionListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.subscriptionListModel.PageNumber;
    if (isSearch) {
      if (this.searchTextForSubscription.length > 0 && this.searchTextForSubscription.length <= 2) {
        return
      } else {
        this.subscriptionListModel.SearchText = this.searchTextForSubscription ? this.searchTextForSubscription : null;
      }
    }
    this._subscriptionModelService.getSubscriptionModel(this.subscriptionListModel.PageNumber, this.subscriptionListModel.PageSize, this.subscriptionListModel.SearchText).subscribe(res => {
      if (res.success == true) {
        console.log(res);
        if (res.pageInfo) {
          if (event?.pageIndex >= 0) {
            this.subscriptionListModel.PageNumber = res.pageInfo.currentPage - 1;
          } else {
            this.subscriptionListModel.PageNumber = res.pageInfo.currentPage;
          }
          this.subscriptionListModel.PageSize = res.pageInfo.pageSize;
          this.subscriptionListModel.TotalPages = res.pageInfo.totalPages;
          this.subscriptionListModel.TotalCount = res.pageInfo.totalCount;
        }
        this.subscriptionList = res.data;
        this.dataSource = new MatTableDataSource(this.subscriptionList)
      }
    })
  }

  deleteSubscriptionModel(id: string) {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete subscription model',
      message: 'Are you sure you want to remove this subscription model? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._subscriptionModelService.deleteSubscriptionModel(id).subscribe(data => {
          if (data.success == true) {
            const index = this.subscriptionList.findIndex(a => a.subscriptionModelId == id);
            if (index >= 0) {
              this.subscriptionList.splice(index, 1);
              this.subscriptionListModel.TotalCount = this.subscriptionList.length;
              this.dataSource = new MatTableDataSource(this.subscriptionList);
            }
          }
        })
      }
    });
  }
}
