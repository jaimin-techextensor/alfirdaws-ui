import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubscriptionModalService } from 'app/service/subscription-modal.service';
import { SubscriptionModel } from '../subscription-model';

@Component({
  selector: 'app-add-subscription-model',
  templateUrl: './add-subscription-model.component.html',
  styleUrls: ['./add-subscription-model.component.scss']
})
export class AddSubscriptionModelComponent implements OnInit {

  @ViewChild('subscriptionModalNgForm') subscriptionModalNgForm: NgForm;
  subscriptionModalForm: UntypedFormGroup;
  isEditMode: boolean = false;
  message: any = "";
  imageSrc: string;
  imageData: string;
  subscriptionModelId: string;
  subcriptionModalData: SubscriptionModel = new SubscriptionModel();
  disabled: boolean = false;

  constructor(
    private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _subscriptionModalService: SubscriptionModalService) { }

  ngOnInit(): void {

    this.subscriptionModalForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      description: [''],
      subscriptionType: ['', [Validators.required]],
      nrOfAds: ['', [Validators.required]],
      unlimitedAds: [false],
      unlimitedPictures: [false],
      nrOfPictures: [''],
      searchEngine: [false],
      vouchers: [false],
      socialMedia: [false],
      basicCampaigns: [false],
      extendedCampaigns: [false],
      statistics: [false],
      trends: [false],
      partnerships: [false],
      onlineSupport: [false],
      active: [false],
      visual: this.imageData
    })

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.subscriptionModelId = params.get('subscriptionModelId');
      if (this.subscriptionModelId != null) {
        this.getSubscriptionModal(this.subscriptionModelId)
        this.isEditMode = true;
      }
    })
  }

  back() {
    this._location.back();
  }

  onFileSelect(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleFileLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleFileLoaded(e) {
    const reader = e.target;
    this.imageData = reader.result;
  }

  getSubscriptionModal(Id: string): void {
    this._subscriptionModalService.getSubscriptionModal(Id).subscribe((data) => {
      if (data.success == true) {
        
        this.subcriptionModalData = data.data;
        this.imageData = this.subcriptionModalData.visual;
        this.subscriptionModalForm.value["subscriptionModelId"] = this.subscriptionModelId;
        this.subscriptionModalForm.patchValue(this.subcriptionModalData);
      }
    })
  }

  addSubscriptionModal(): void {
    if (this.subscriptionModalForm.invalid) {
      return;
    }
    this.subscriptionModalForm.disable();
    let subscriptionModal = {
      name: this.subscriptionModalForm.value["name"],
      userType: this.subscriptionModalForm.value["userType"],
      description: this.subscriptionModalForm.value["description"],
      subscriptionType: this.subscriptionModalForm.value["subscriptionType"],
      nrOfAds: this.subscriptionModalForm.value["nrOfAds"],
      unlimitedAds: this.subscriptionModalForm.value["unlimitedAds"],
      unlimitedPictures: this.subscriptionModalForm.value["unlimitedPictures"],
      nrOfPictures: this.subscriptionModalForm.value["nrOfPictures"],
      isSearchEngine: this.subscriptionModalForm.value["searchEngine"],
      isVouchers: this.subscriptionModalForm.value["vouchers"],
      isSocialMedia: this.subscriptionModalForm.value["socialMedia"],
      isBasicCampaigns: this.subscriptionModalForm.value["basicCampaigns"],
      isExtendedCampaigns: this.subscriptionModalForm.value["extendedCampaigns"],
      isStatistics: this.subscriptionModalForm.value["statistics"],
      isTrends: this.subscriptionModalForm.value["trends"],
      isPartnership: this.subscriptionModalForm.value["partnerships"],
      isOnlineSupport: this.subscriptionModalForm.value["onlineSupport"],
      active: this.subscriptionModalForm.value["active"],
      visual: this.imageData
    }
    this._subscriptionModalService.createSubscriptionModal(subscriptionModal).subscribe(
      (data) => {
        if (data.success == true) {
          this._location.back();
        }
        else {
          this.message = data.message ? data.message : '';
        }
      }
    )
  }

  editSubscription(): void {

    if (this.subscriptionModalForm.invalid) {
      return;
    }
    this.subscriptionModalForm.disable();
    let EditSubscriptionModalForm = {
      name: this.subscriptionModalForm.value["name"],
      userType: this.subscriptionModalForm.value["userType"],
      description: this.subscriptionModalForm.value["description"],
      subscriptionType: this.subscriptionModalForm.value["subscriptionType"],
      nrOfAds: this.subscriptionModalForm.value["nrOfAds"],
      unlimitedAds: this.subscriptionModalForm.value["unlimitedAds"],
      unlimitedPictures: this.subscriptionModalForm.value["unlimitedPictures"],
      nrOfPictures: this.subscriptionModalForm.value["nrOfPictures"],
      isSearchEngine: this.subscriptionModalForm.value["searchEngine"],
      isVouchers: this.subscriptionModalForm.value["vouchers"],
      isSocialMedia: this.subscriptionModalForm.value["socialMedia"],
      isBasicCampaigns: this.subscriptionModalForm.value["basicCampaigns"],
      isExtendedCampaigns: this.subscriptionModalForm.value["extendedCampaigns"],
      isStatistics: this.subscriptionModalForm.value["statistics"],
      isTrends: this.subscriptionModalForm.value["trends"],
      isPartnership: this.subscriptionModalForm.value["partnerships"],
      isOnlineSupport: this.subscriptionModalForm.value["onlineSupport"],
      active: this.subscriptionModalForm.value["active"],
      visual: this.imageData,
      SubscriptionModelId: this.subscriptionModelId
    }
    this.subscriptionModalForm.value["visual"] = this.imageData;
    this._subscriptionModalService.updateSubscriptionModal(EditSubscriptionModalForm).subscribe(
      (data) => {
        if (data.success == true) {
          this._location.back();
        }
      }
    )
  }

}
