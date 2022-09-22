import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { CampaignService } from 'app/service/campaign.service';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})

export class AddCampaignComponent implements OnInit {
  @ViewChild('campaignNgForm') campaignNgForm: NgForm;
  campaignForm: UntypedFormGroup;

  isLoginerror = false;
  submitted: boolean = false;
  showAlert: boolean = false;

  campaignId: string;
  campaignData: any;

  imageSrc: string;
  imageData: string;

  campaginTypes: any = [];
  periodTypes: any = [];
  reachTypes: any = [];

  selectedCampaignTypeId: string;
  selectedCampaignTypeName: string;

  selectedReachTypeId: string;
  selectedReachTypeName: string;

  selectedPeriodTypeId: string;
  selectedPeriodTypeName: string;
  message: any = "";
  isEditMode: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  constructor(
    private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private campaignService: CampaignService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.campaignForm = this._formBuilder.group({
      description: [''],
      impactPosition: [''],
      impactViews: [''],
      campaigntype: [0, [Validators.required]],
      reachtype: [0, [Validators.required]],
      periodtype: [0, [Validators.required]],
      price: ['', [Validators.required]],
      discountPercentage: ['', [Validators.required]],
      netPrice: [''],
      saving: [''],
      pricePerDay: [''],
      active: [''],
      visual: [''],
    })

    this.campaignService.getCampaginTypes().subscribe(data => {
      this.campaginTypes = data.data;
    })

    this.campaignService.getPeriodTypes().subscribe(data => {
      this.periodTypes = data.data;
    })

    this.campaignService.getReachTypes().subscribe(data => {
      this.reachTypes = data.data
    })

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.campaignId = params.get('campaignId');
      if (this.campaignId != null) {
        this.getCampaign(this.campaignId);
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
    this.imageSrc = reader.result.split(',')[1];
    var j = this.campaignForm;
  }

  selectedCampaignType(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.selectedCampaignTypeId = selectedData.value;
    this.selectedCampaignTypeName = selectedData.text;
  }

  selectedReachType(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    }
    this.selectedReachTypeId = selectedData.value;
    this.selectedReachTypeName = selectedData.text;
  }

  selectedPeriodType(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    }
    this.selectedPeriodTypeId = selectedData.value;
    this.selectedPeriodTypeName = selectedData.text;
  }

  getCampaign(Id: string): void {
    this.campaignService.getCampaign(Id).subscribe((data) => {
      if (data.success == true) {
        this.campaignData = data.data;
        this.imageData = this.campaignData.visual;
        this.campaignForm.value["campaignId"] = this.campaignData.campaignId;
        this.campaignForm.controls["campaigntype"].setValue(this.campaignData.campaignTypeId);
        this.campaignForm.controls["reachtype"].setValue(this.campaignData.reachTypeId)
        this.campaignForm.controls["periodtype"].setValue(this.campaignData.periodTypeId)
        this.campaignForm.patchValue(this.campaignData);
      }
    })
  }

  addCampaign(): void {
    this.isLoginerror = false;
    this.submitted = true;
    if (this.campaignForm.invalid) {
      return;
    }
    this.campaignForm.disable();
    this.showAlert = false;
    let campaignModel = {
      description: this.campaignForm.value["description"],
      impactPosition: this.campaignForm.value["impactPosition"],
      impactViews: this.campaignForm.value["impactViews"],
      campaignTypeId: this.campaignForm.value["campaigntype"],
      reachTypeId: this.campaignForm.value["reachtype"],
      periodTypeId: this.campaignForm.value["periodtype"],
      price: this.campaignForm.value["price"],
      discountPercentage: this.campaignForm.value["discountPercentage"],
      netPrice: this.campaignForm.value["netPrice"],
      saving: this.campaignForm.value["saving"],
      pricePerDay: this.campaignForm.value["pricePerDay"],
      active: this.campaignForm.value["active"],
      visual: this.imageData
    }
    this.campaignService.createCampaign(campaignModel).subscribe(
      (data) => {
        if (data.success == true) {
          this.alert = {
            type: 'success',
            message: 'Campaign Created Successfully!!'
          };
          this.showAlert = true;
          this._location.back();
        }
        else {
          this.message = data.message ? data.message : '';
        }
      }
    )
  }

  editCampaign(): void {
    this.isLoginerror = false;
    this.submitted = true;
    if (this.campaignForm.invalid) {
      return;
    }
    this.campaignForm.disable();
    this.showAlert = false;

    this.campaignForm.value["visual"] = this.imageData;
    this.campaignService.updateCampaign(this.campaignForm.value).subscribe(
      (data) => {
        if (data.success == true) {
          this.alert = {
            type: "success",
            message: "Campaign updated successfully."
          };
          this.showAlert = true;
          this._location.back();
        }
      }
    )
  }

  onKeyupCalculate(): void {
    if (this.campaignForm.controls['price'].value > 0 && this.campaignForm.controls['discountPercentage'].value > 0) {
      var netPrice = this.campaignForm.controls['price'].value - (this.campaignForm.controls['price'].value * this.campaignForm.controls['discountPercentage'].value / 100);
      this.campaignForm.controls['netPrice'].setValue(parseFloat(netPrice.toString()).toFixed(2));
      this.campaignForm.controls['saving'].setValue(parseFloat((this.campaignForm.controls['price'].value - netPrice).toString()).toFixed(2));
      this.campaignForm.controls['pricePerDay'].setValue(parseFloat((netPrice / 30).toString()).toFixed(2));
    }
  }

} 
