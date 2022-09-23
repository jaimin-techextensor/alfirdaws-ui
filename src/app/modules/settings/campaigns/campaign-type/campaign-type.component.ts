import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CampaignTypeService } from 'app/service/campaign-type.service';

@Component({
  selector: 'app-campaign-type',
  templateUrl: './campaign-type.component.html',
  styleUrls: ['./campaign-type.component.scss']
})

export class CampaignTypeComponent implements OnInit {

  constructor(
    private _campaignTypeService: CampaignTypeService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private router: Router
  ) { }

  dataSource: any;
  displayedColumns: string[] = ['Campaign', 'Action'];
  campaignTypes: any = [];
  campaignTypeForm: UntypedFormGroup;
  iscampaignTypeselected: boolean = false;
  selecetedCampaignType: any;
  campaignTypeId: string;
  message: string = "";

  ngOnInit(): void {
    this._campaignTypeService.getcampaignTypes().subscribe(data => {
      this.campaignTypes = data.data;
      this.dataSource = new MatTableDataSource(this.campaignTypes);
    })

    this.campaignTypeForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  navigateBack() {
    this.router.navigate(['campaigns']);
  }

  addCampaignType() {
    this.iscampaignTypeselected = false;
    let campaignModel = {
      name: this.campaignTypeForm.value["name"],
    }
    if (this.campaignTypeForm.invalid) {
      return;
    }
    this._campaignTypeService.createCampaignType(campaignModel).subscribe((data) => {
      if (data.success == true) {
        this.campaignTypes.push(campaignModel);
        this.dataSource = new MatTableDataSource(this.campaignTypes);
        this.campaignTypeForm.clearValidators();
        this.campaignTypeForm.reset();
        this.campaignTypeForm.enable();
      } else {
        this.message = data.message ? data.message : '';
        this.campaignTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  editCampaign() {
    if (this.campaignTypeForm.invalid) {
      return;
    }
    let campaignModel = {
      name: this.campaignTypeForm.value["name"],
      campaignTypeId: this.campaignTypeId
    }
    this._campaignTypeService.updateCampaignType(campaignModel).subscribe((data: any) => {
      if (data.success == true) {
        const index = this.campaignTypes.findIndex(a => a.campaignTypeId == this.campaignTypeId)
        if (index >= 0) {
          let campaignData = {
            name: this.campaignTypeForm.value["name"],
            campaignTypeId: this.campaignTypeId
          }
          this.campaignTypes[index] = campaignData;
          this.dataSource = new MatTableDataSource(this.campaignTypes);
        }
      } else {
        this.message = data.message ? data.message : '';
        this.campaignTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  cancel() {
    this.iscampaignTypeselected = false;
    this.selecetedCampaignType = null;
    this.campaignTypeId = "";
    this.campaignTypeForm.setValue({ name: null });
  }

  deleteSelectedCampaign(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Campaign type??",
      message: "Are you sure you want to delete this Campaign type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    conformation.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        this._campaignTypeService.deleteCampaignType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.campaignTypes.findIndex(a => a.campaignTypeId === id);
            if (index >= 0) {
              this.campaignTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.campaignTypes);
              this.campaignTypeForm.clearValidators();
              this.campaignTypeForm.reset();
              this.campaignTypeForm.enable();
            }
          }
        })
      }
    })
  }

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.iscampaignTypeselected = true;//!this.visible;
      if (rowData) {
        this.selecetedCampaignType = rowData;
        this.campaignTypeId = rowData.campaignTypeId
        this.campaignTypeForm.setValue({ name: this.selecetedCampaignType.name });
      }
    }
  }
}
