import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddressTypeService } from './../../../service/address-type.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: ['./address-type.component.scss']
})
export class AddressTypeComponent implements OnInit {
  addressTypes: any = [];
  displayedColumns = ["AddressType", "Action"];
  dataSource: any;
  addressTypeForm: UntypedFormGroup;
  addressTypeId: string;
  isAddressTypeSelected: boolean = false;
  message: string;
  isDeletePermission: boolean;
  constructor(
    private location: Location,
    private addressTypeService: AddressTypeService,
    private formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.addressTypeForm = this.formBuilder.group({
      name: ["", [Validators.required]]
    });
    this.getAddressTypeList();
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
  }

  navigateBack() {
    this.location.back();
  }

  getAddressTypeList() {
    this.addressTypeService.getAddressTypeList().subscribe(data => {
      this.addressTypes = data.data;
      this.dataSource = new MatTableDataSource(this.addressTypes);
    })
  }

  addAddress() {
    let addressTypeModel = {
      name: this.addressTypeForm.value["name"]
    }
    if (this.addressTypeForm.invalid) {
      return;
    };
    this.addressTypeService.addAddressType(addressTypeModel).subscribe(data => {
      if (data.success == true) {
        var addressType = data?.data;
        this.addressTypes.push(addressType);
        this.dataSource = new MatTableDataSource(this.addressTypes);
        this.addressTypeForm = this.formBuilder.group({
          name: ["", [Validators.required]]
        });
      } else {
        this.message = data.message ? data.message : "";
        this.addressTypeForm.get('name').setErrors({ 'duplicate': this.message })
      }
    })
  }

  editAddressType() {
    if (this.addressTypeForm.invalid) {
      return;
    }
    let addressTypeModel = {
      name: this.addressTypeForm.value["name"],
      addressTypeId: this.addressTypeId
    }
    this.addressTypeService.editAddressType(addressTypeModel).subscribe(data => {
      if (data.success == true) {
        const index = this.addressTypes.findIndex(a => a.addressTypeId == this.addressTypeId);
        if (index >= 0) {
          this.addressTypes[index] = addressTypeModel;
          this.dataSource = new MatTableDataSource(this.addressTypes);
          this.isAddressTypeSelected = false;
          this.addressTypeForm = this.formBuilder.group({
            name: ["", [Validators.required]]
          });
        }
      } else {
        this.message = data.message ? data.message : "";
        this.addressTypeForm.get('name').setErrors({ 'duplicate': this.message })
      }
    })
  }

  removeAddressType(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Address type??",
      message: "Are you sure you want to delete this Address type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    conformation.afterClosed().subscribe(resulet => {
      if (resulet == 'confirmed') {
        this.addressTypeService.deleteAddressType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.addressTypes.findIndex(a => a.addressTypeId == id);
            if (index >= 0) {
              this.addressTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.addressTypes);
            }
          }
        })
      }
    })
  }

  cancel() {
    this.isAddressTypeSelected = false;
    this.addressTypeId = '';
    this.addressTypeForm.setValue({ name: null })
  }

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isAddressTypeSelected = true;
      if (rowData) {
        this.addressTypeId = rowData.addressTypeId;
        this.addressTypeForm.setValue({ name: rowData.name });
      }
    }
  }
}
