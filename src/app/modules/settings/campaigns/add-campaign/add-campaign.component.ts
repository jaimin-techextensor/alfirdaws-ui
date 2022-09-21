import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {
  @ViewChild('campaignNgForm') campaignNgForm: NgForm;
  campaignForm: UntypedFormGroup

  isLoginerror = false;
  submitted: boolean = false;
  showAlert: boolean = false;

  imageSrc: string;
  imageData: string;

  isEditMode: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  constructor(
    private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.campaignForm = this._formBuilder.group({
      description: [''],
      impactPosition: [''],
      impactViews: [''],

      campaigntype: ['', [Validators.required]],
      reachtype: ['', [Validators.required]],
      periodtype: ['', [Validators.required]],

      price: ['', [Validators.required]],
      discountPercentage: [''],
      netPrice: [''],
      saving: [''],
      pricePerDay: [''],

      active: ['']
      //  picture: [''],
      // CampaignId: ['']
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
  selectedCampaignType(event: MatSelectChange) { }

  selectedReachType(event: MatSelectChange) { }

  selectedPeriodType(event: MatSelectChange) { }

  addCampaign() { }

  editCampaign() { }

} 
