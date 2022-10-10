import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PeriodTypeService } from 'app/service/period-type.service';
import { PricingModelService } from 'app/service/pricing-model.service';
import { SubscriptionModelService } from 'app/service/subscription-model.service';
import { PageRequestModel } from '../../users/page-request';

@Component({
  selector: 'app-add-pricing-model',
  templateUrl: './add-pricing-model.component.html',
  styleUrls: ['./add-pricing-model.component.scss']
})
export class AddPricingModelComponent implements OnInit {

  @ViewChild('priceModalNgForm') subscriptionModalNgForm: NgForm;
  priceModalForm: UntypedFormGroup;
  isEditMode: boolean = false;
  message: any = "";
  pricingModelId: string;
  priceModelData: any;
  subscriptionTypes: any = [];
  periodTypes: any = [];
  subscriptionList: any = []
  subscriptionListModel: PageRequestModel = new PageRequestModel();

  constructor(
    private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _priceModelService: PricingModelService,
    private _periodTypeService: PeriodTypeService,
    private _subscriptionModelService: SubscriptionModelService,
  ) { }

  ngOnInit(): void {

    this.priceModalForm = this._formBuilder.group({
      SubscriptionModel: [0, [Validators.required]],
      PeriodType: [0, [Validators.required]],
      NrOfDays: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      DiscountPercentage: ['', [Validators.required]],
      NetPrice: [],
      Saving: [],
      PricePerDay: []
    })

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.pricingModelId = params.get('pricingModelId');
      if (this.pricingModelId != null) {
        this.getPriceModel(this.pricingModelId)
        this.isEditMode = true;
      }
    });

    this._periodTypeService.getPeriodTypes().subscribe(data => {
      this.periodTypes = data.data;
    });

    this._subscriptionModelService.getSubscriptionModel(this.subscriptionListModel.PageNumber, this.subscriptionListModel.PageSize, this.subscriptionListModel.SearchText).subscribe(res => {
      this.subscriptionList = res.data;
    });
  }

  back() {
    this._location.back();
  }

  getPriceModel(Id: string): void {
    this._priceModelService.getPriceModelById(Id).subscribe((data) => {
      if (data.success == true) {
        this.priceModelData = data.data;
        this.subscriptionTypes = this.priceModelData.subscriptionType;
        this.periodTypes = this.priceModelData.periodTypes;
        this.priceModalForm.value["pricingModelId"] = this.priceModelData.pricingModelId;
        this.priceModalForm.controls["SubscriptionModel"].setValue(this.priceModelData.subscriptionModelId);
        this.priceModalForm.controls["PeriodType"].setValue(this.priceModelData.periodTypeId);
        this.priceModalForm.controls["NrOfDays"].setValue(this.priceModelData.nrOfDays);
        this.priceModalForm.controls["Price"].setValue(this.priceModelData.price);
        this.priceModalForm.controls["DiscountPercentage"].setValue(this.priceModelData.discountPercentage);
        this.priceModalForm.controls["NetPrice"].setValue(this.priceModelData.netPrice);
        this.priceModalForm.controls["Saving"].setValue(this.priceModelData.saving);
        this.priceModalForm.controls["PricePerDay"].setValue(this.priceModelData.pricePerDay);
      };
    });
  };

  addPriceModel(): void {
    if (this.priceModalForm.invalid) {
      return;
    }
    this.priceModalForm.disable();
    let priceModel = {
      subscriptionModelId: this.priceModalForm.value["SubscriptionModel"],
      periodTypeId: this.priceModalForm.value["PeriodType"],
      nrOfDays: this.priceModalForm.value["NrOfDays"],
      price: this.priceModalForm.value["Price"],
      discountPercentage: this.priceModalForm.value["DiscountPercentage"],
      netPrice: this.priceModalForm.value["NetPrice"],
      saving: this.priceModalForm.value["Saving"],
      pricePerDay: this.priceModalForm.value["PricePerDay"]
    };
    this._priceModelService.addPriceModel(priceModel).subscribe((data) => {
      if (data.success == true) {
        this._location.back();
      }
      else {
        this.message = data.message ? data.message : '';
      };
    });
  };

  editPriceModel(): void {
    if (this.priceModalForm.invalid) {
      return;
    }
    this.priceModalForm.disable();
    let editPriceModel = {
      subscriptionModelId: this.priceModalForm.value["SubscriptionModel"],
      periodTypeId: this.priceModalForm.value["PeriodType"],
      nrOfDays: this.priceModalForm.value["NrOfDays"],
      price: this.priceModalForm.value["Price"],
      discountPercentage: this.priceModalForm.value["DiscountPercentage"],
      netPrice: this.priceModalForm.value["NetPrice"],
      saving: this.priceModalForm.value["Saving"],
      pricePerDay: this.priceModalForm.value["PricePerDay"],
      pricingModelId: this.pricingModelId
    }
    this._priceModelService.updatePriceModel(editPriceModel).subscribe((data) => {
      if (data.success == true) {
        this._location.back();
      }
    })
  }

  onKeyupCalculate(): void {
    if (this.priceModalForm.controls['Price'].value > 0 && this.priceModalForm.controls['DiscountPercentage'].value > 0) {
      var netPrice = this.priceModalForm.controls['Price'].value - (this.priceModalForm.controls['Price'].value * this.priceModalForm.controls['DiscountPercentage'].value / 100);
      this.priceModalForm.controls['NetPrice'].setValue(parseFloat(netPrice.toString()).toFixed(2));
      this.priceModalForm.controls['Saving'].setValue(parseFloat((this.priceModalForm.controls['Price'].value - netPrice).toString()).toFixed(2));
      this.priceModalForm.controls['PricePerDay'].setValue(parseFloat((netPrice / 30).toString()).toFixed(2));
    }
  }
}
