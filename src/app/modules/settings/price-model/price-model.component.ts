import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { PriceModelService } from 'app/service/price-model.service';
import { PageRequestModel } from '../users/page-request';

@Component({
  selector: 'app-price-model',
  templateUrl: './price-model.component.html',
  styleUrls: ['./price-model.component.scss']
})
export class PriceModelComponent implements OnInit {

  priceList: any = []
  priceListModel: PageRequestModel = new PageRequestModel();
  dataSource: any;
  searchTextForPrice: string = null;
  visible: boolean = false;
  selectedRow: any;
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
    private _priceModelService: PriceModelService,

  ) { }

  ngOnInit(): void {
    this.getPriceModelList(null, false);
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');

  }

  navigateBack() {
    this._location.back()
  }

  getPriceModelList(event: any, isSearch: boolean = false) {
    debugger;
    this.priceListModel.PageSize = event?.pageSize ? event.pageSize : this.priceListModel.PageSize;
    this.priceListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.priceListModel.PageNumber;
    if (isSearch) {
      if (this.searchTextForPrice.length > 0 && this.searchTextForPrice.length <= 2) {
        return
      } else {
        this.priceListModel.SearchText = this.searchTextForPrice ? this.searchTextForPrice : null;
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
    debugger;
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete price model',
      message: 'Are you sure you want to remove this price model? This action cannot be undone!',
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
            const index = this.priceList.findIndex(a => a.PricingModelId == id);
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

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.visible = true;
      if (rowData) {
        this.selectedRow = rowData;
      }
    }
  }

  editPriceModel(id: string) {
    debugger;
    this._router.navigateByUrl("price-model/edit-price-model/" + id);

  }

} 
