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
  campaginTypes: any = [];
  campaignTypeForm: UntypedFormGroup;
  isCampaginTypeSelected: boolean = false;
  selecetedCampaginType: any;
  campaginTypeId: string;
  message: string = "";

  ngOnInit(): void {
    this._campaignTypeService.getCampaginTypes().subscribe(data => {
      this.campaginTypes = data.data;
      this.dataSource = new MatTableDataSource(this.campaginTypes);
    })

    this.campaignTypeForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  navigateBack() {
    this.router.navigate(['campaigns']);
  }

  addCampaginType() {
    this.isCampaginTypeSelected = false;
    let campaginModel = {
      name: this.campaignTypeForm.value["name"],
    }
    if (this.campaignTypeForm.invalid) {
      return;
    }
    this._campaignTypeService.createCampaignType(campaginModel).subscribe((data) => {
      if (data.success == true) {
        this.campaginTypes.push(campaginModel);
        this.dataSource = new MatTableDataSource(this.campaginTypes);
        this.campaignTypeForm.clearValidators();
        this.campaignTypeForm.reset();
        this.campaignTypeForm.enable();
      } else {
        this.message = data.message ? data.message : '';
        this.campaignTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  editCampagin() {
    if (this.campaignTypeForm.invalid) {
      return;
    }
    let campaginModel = {
      name: this.campaignTypeForm.value["name"],
      campaignTypeId: this.campaginTypeId
    }
    this._campaignTypeService.updateCampaignType(campaginModel).subscribe((data: any) => {
      if (data.success == true) {
        const index = this.campaginTypes.findIndex(a => a.campaignTypeId == this.campaginTypeId)
        if (index >= 0) {
          let campaginData = {
            name: this.campaignTypeForm.value["name"],
            campaignTypeId: this.campaginTypeId
          }
          this.campaginTypes[index] = campaginData;
          this.dataSource = new MatTableDataSource(this.campaginTypes);
        }
      } else {
        this.message = data.message ? data.message : '';
        this.campaignTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  cancel() {
    this.isCampaginTypeSelected = false;
    this.selecetedCampaginType = null;
    this.campaginTypeId = "";
    this.campaignTypeForm.setValue({ name: null });
  }

  deleteSelectedCampagin(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Campagin type??",
      message: "Are you sure you want to delete this Campagin type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    conformation.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        this._campaignTypeService.deleteCampaginType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.campaginTypes.findIndex(a => a.campaignTypeId === id);
            if (index >= 0) {
              this.campaginTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.campaginTypes);
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
      this.isCampaginTypeSelected = true;//!this.visible;
      if (rowData) {
        this.selecetedCampaginType = rowData;
        this.campaginTypeId = rowData.campaignTypeId
        this.campaignTypeForm.setValue({ name: this.selecetedCampaginType.name });
      }
    }
  }
}
