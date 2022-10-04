import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { VatTypeService } from './../../../service/vat-type.service';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vat-type',
  templateUrl: './vat-type.component.html',
  styleUrls: ['./vat-type.component.scss']
})

export class VatTypeComponent implements OnInit {
  vatTypeForm: UntypedFormGroup;
  vatTypes: any = [];
  displayedColumns = ["Vat", "Percentage", "Action"];
  dataSource: any;
  message: string;
  vatTypeId: string;
  isSelectedVatType: boolean = false;
  isDeletePermission: boolean;
  isEditPermission: boolean;

  constructor(
    private _location: Location,
    private _vatTypeService: VatTypeService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.vatTypeForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      percentage: ["", [Validators.required, Validators.min, Validators.max]],
      description: [""],
    });
    this.getVatType();
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
  }

  navigateBack() {
    this._location.back();
  };

  getVatType() {
    this._vatTypeService.getVatTypes().subscribe(data => {
      if (data.success == true) {
        this.vatTypes = data.data;
        this.dataSource = new MatTableDataSource(this.vatTypes);
      };
    });
  };

  addVatType() {
    if (this.vatTypeForm.invalid) {
      return;
    }
    let vatModel = {
      name: this.vatTypeForm.value["name"],
      percentage: this.vatTypeForm.value["percentage"],
      description: this.vatTypeForm.value["description"]
    };
    this._vatTypeService.addVatType(vatModel).subscribe(data => {
      console.log("data", data);

      if (data.success == true) {
        var vatType = data.data;
        this.vatTypes.push(vatType);
        this.dataSource = new MatTableDataSource(this.vatTypes);
      } else {
        this.message = data.message ? data.message : '';
        this.vatTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
    this.vatTypeForm.reset();
  }

  editVatType() {
    if (this.vatTypeForm.invalid) {
      return;
    };
    let vatModel = {
      name: this.vatTypeForm.value["name"],
      percentage: this.vatTypeForm.value["percentage"],
      description: this.vatTypeForm.value["description"],
      vatTypeId: this.vatTypeId
    }
    this._vatTypeService.updateVatType(vatModel).subscribe(data => {
      if (data.success == true) {
        const index = this.vatTypes.findIndex(a => a.vatTypeId == this.vatTypeId);
        if (index >= 0) {
          this.vatTypes[index] = vatModel;
          this.dataSource = new MatTableDataSource(this.vatTypes);
          this.isSelectedVatType = false;
          this.vatTypeForm.reset();
        }
      } else {
        this.message = data.message ? data.message : '';
        this.vatTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  deleteVatType(id: string) {
    const conFormation = this._fuseConfirmationService.open({
      title: "Delete Vat Type??",
      message: "Are you sure you want to delete this Vat Type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    });
    conFormation.afterClosed().subscribe(result => {
      if (result == "confirmed") {
        this._vatTypeService.deleteVatType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.vatTypes.findIndex(a => a.vatTypeId == id);
            if (index >= 0) {
              this.vatTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.vatTypes);
            };
          };
        });
      };
    });
  };

  cancel() {
    this.isSelectedVatType = false;
    this.vatTypeForm.setValue({ name: null, percentage: null, description: null });
    this.vatTypeId = '';
    this.vatTypeForm.reset();
  }

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isSelectedVatType = true;
      if (rowData) {
        this.vatTypeId = rowData.vatTypeId;
        this.vatTypeForm.setValue({ name: rowData.name, percentage: rowData.percentage, description: rowData.description });
      }
    }
  }

}
