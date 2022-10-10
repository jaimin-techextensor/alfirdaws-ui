import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { PricingModelService } from 'app/service/pricing-model.service';
import { PageRequestModel } from '../users/page-request';

@Component({
  selector: 'app-pricing-model',
  templateUrl: './pricing-model.component.html',
  styleUrls: ['./pricing-model.component.scss']
})
export class PricingModelComponent implements OnInit {

  priceList: any = []
  priceListModel: PageRequestModel = new PageRequestModel();
  dataSource: any;
  searchText: string = null;
  visible: boolean = false;
  isDeletePermission = false;
  isEditPermission = false;
  isAddPermission = false;
  periodTypes: any = [];
  displayedColumns = [
    "SubscriptionModel",
    "Period",
    "NrOfdays",
    "Price",
    "Discount",
    "NetPrice",
    "Action"
  ]

  constructor(
    private _location: Location,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    private _priceModelService: PricingModelService,

  ) { }

  ngOnInit(): void {
    this.getPriceModelList(null, false);
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');;
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
  }

  navigateBack() {
    this._location.back()
  }

  getPriceModelList(event: any, isSearch: boolean = false) {
    this.priceListModel.PageSize = event?.pageSize ? event.pageSize : this.priceListModel.PageSize;
    this.priceListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.priceListModel.PageNumber;
    if (isSearch) {
      if (this.searchText.length > 0 && this.searchText.length <= 2) {
        return
      } else {
        this.priceListModel.SearchText = this.searchText ? this.searchText : null;
      }
    }
    this._priceModelService.getPriceModel(this.priceListModel.PageNumber, this.priceListModel.PageSize, this.priceListModel.SearchText).subscribe(res => {
      if (res.success == true) {
        if (res.pageInfo) {
          if (event?.pageIndex >= 0) {
            this.priceListModel.PageNumber = res.pageInfo.currentPage - 1;
          } else {
            this.priceListModel.PageNumber = res.pageInfo.currentPage;
          }
          this.priceListModel.PageSize = res.pageInfo.pageSize;
          this.priceListModel.TotalPages = res.pageInfo.totalPages;
          this.priceListModel.TotalCount = res.pageInfo.totalCount;
        }
        this.priceList = res.data;
        this.dataSource = new MatTableDataSource(this.priceList)
      }
    })
  }

  deletePriceModel(id: string) {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Pricing Model',
      message: 'Are you sure you want to remove this Pricing Model? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._priceModelService.deletePriceModel(id).subscribe(data => {
          if (data.success == true) {
            const index = this.priceList.findIndex(a => a.pricingModelId == id);
            if (index >= 0) {
              this.priceList.splice(index, 1);
              this.priceListModel.TotalCount = this.priceList.length;
              this.dataSource = new MatTableDataSource(this.priceList);
            }
          }
        })
      }
    })
  }

  editPriceModel(id: string) {
    this._router.navigateByUrl("pricing-model/edit-pricing-model/" + id);
  }

} 
