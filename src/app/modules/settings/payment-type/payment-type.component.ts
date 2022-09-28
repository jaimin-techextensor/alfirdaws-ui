import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentTypeService } from './../../../service/payment-type.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})

export class PaymentTypeComponent implements OnInit {
  paymentTypes: any = [];
  displayedColumns = ["PaymentType", "Icon", "Action"];
  dataSource: any;
  paymentTypeForm: UntypedFormGroup;
  imageData: string;
  paymentTypeId: string;
  isPaymentTypeSelected: boolean = false;
  message: string;
  isDeletePermission: boolean;
  isEditPermission: boolean;

  constructor(
    private location: Location,
    private paymentTypeService: PaymentTypeService,
    private formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.paymentTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      Icon: ['']
    })
    this.getPaymentTypesList();
  }

  navigateBack() {
    this.location.back();
  }

  getPaymentTypesList() {
    this.paymentTypeService.getPaymentTypes().subscribe(data => {
      if (data.success == true) {
        this.paymentTypes = data.data;
        this.dataSource = new MatTableDataSource(this.paymentTypes);
      }
    })
  }

  addPaymentType() {
    let paymentModel = {
      name: this.paymentTypeForm.value["name"],
      Icon: this.imageData ? this.imageData : ''
    }
    if (this.paymentTypeForm.invalid) {
      return;
    }
    this.paymentTypeService.addPaymentType(paymentModel).subscribe(data => {
      if (data.success == true) {
        this.imageData = '';
        var paymentType = data?.data;
        this.paymentTypes.push(paymentType);
        this.dataSource = new MatTableDataSource(this.paymentTypes);
        this.paymentTypeForm.reset();
      } else {
        this.message = data.message ? data.message : '';
        this.paymentTypeForm.get('name').setErrors({ "duplicate": this.message });
      }
    })
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

  editPaymentType() {
    if (this.paymentTypeForm.invalid) {
      return;
    }
    let paymentTypeModel = {
      name: this.paymentTypeForm.value["name"],
      Icon: this.imageData ? this.imageData : '',
      paymentTypeId: this.paymentTypeId
    };
    this.paymentTypeService.editPaymentType(paymentTypeModel).subscribe(data => {
      if (data.success == true) {
        this.isPaymentTypeSelected = false;
        const index = this.paymentTypes.findIndex(a => a.paymentTypeId == this.paymentTypeId);
        if (index >= 0) {
          this.paymentTypes[index] = paymentTypeModel;
          this.paymentTypes[index].icon = this.imageData;
          this.dataSource = new MatTableDataSource(this.paymentTypes);
          this.imageData = '';
          this.paymentTypeForm.setValue({ name: null, Icon: "" });
        };
      } else {
        this.message = data.messages ? data.messages : '';
        this.paymentTypeForm.get('name').setErrors({ "duplicat": this.message });
      };
    });
  };

  deletePaymentType(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Payment type??",
      message: "Are you sure you want to delete this Payment type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    conformation.afterClosed().subscribe(resulet => {
      if (resulet == 'confirmed') {
        this.paymentTypeService.deletePaymentType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.paymentTypes.findIndex(a => a.paymentTypeId == id);
            if (index >= 0) {
              this.paymentTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.paymentTypes);
              this.isPaymentTypeSelected = false;
              this.paymentTypeForm.setValue({ name: null, Icon: "" });
            }
          }
        })
      }
    })
  }

  cancel() {
    this.isPaymentTypeSelected = false;
    this.imageData = "";
    this.paymentTypeForm.setValue({ name: null, Icon: "" });
    this.paymentTypeId = '';
  }

  onRowClick(event, rowData) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isPaymentTypeSelected = true;
      if (rowData) {
        this.paymentTypeId = rowData.paymentTypeId;
        this.imageData = rowData.icon ? rowData.icon : "";
        this.paymentTypeForm.setValue({ name: rowData.name, Icon: this.imageData ? this.imageData : "" })
      }
    }
  }
}
