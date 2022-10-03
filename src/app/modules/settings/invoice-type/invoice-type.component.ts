import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceTypeService } from './../../../service/invoice-type.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss']
})

export class InvoiceTypeComponent implements OnInit {
  invoiceTypes: any = [];
  displayedColumns = ["InvoiceType", "Action"];
  dataSource: any;
  invoiceTypeForm: UntypedFormGroup;
  message: string;
  isSelectedInvoiceType: boolean = false;
  invoiceTypeId: string;
  isDeletePermission: boolean;
  isEditPermission: boolean;
  
  constructor(
    private location: Location,
    private invoiceTypeService: InvoiceTypeService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.invoiceTypeForm = this._formBuilder.group({
      name: ["", [Validators.required]]
    });
    this.getInvoiceTypes();
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
  }

  navigateBack() {
    this.location.back();
  };

  getInvoiceTypes() {
    this.invoiceTypeService.getInvoiceTypes().subscribe(data => {
      if (data.success == true) {
        this.invoiceTypes = data.data;
        this.dataSource = new MatTableDataSource(this.invoiceTypes);
      }
    })
  }

  addInvoiceType() {
    if (this.invoiceTypeForm.invalid) {
      return;
    }
    let invoiceModel = {
      name: this.invoiceTypeForm.value["name"]
    }
    this.invoiceTypeService.addInvoiceType(invoiceModel).subscribe(data => {
      if (data.success == true) {
        var invoiceType = data.data;
        this.invoiceTypes.push(invoiceType);
        this.dataSource = new MatTableDataSource(this.invoiceTypes);
        this.invoiceTypeForm.reset();
      } else {
        this.message = data.message ? data.message : '';
        this.invoiceTypeForm.get('name').setErrors({ 'duplicate': this.message });
      };
    });
  };

  cancel() {
    this.invoiceTypeForm.setValue({ name: null });
    this.isSelectedInvoiceType = false;
    this.invoiceTypeId = '';
  };

  editInvoiceType() {
    if (this.invoiceTypeForm.invalid) {
      return;
    }
    let invoiceTypeModel = {
      invoiceTypeId: this.invoiceTypeId,
      name: this.invoiceTypeForm.value["name"]
    }
    this.invoiceTypeService.updateInvoiceType(invoiceTypeModel).subscribe(data => {
      if (data.success == true) {
        const index = this.invoiceTypes.findIndex(a => a.invoiceTypeId == this.invoiceTypeId);
        if (index >= 0) {
          this.invoiceTypes[index] = invoiceTypeModel;
          this.dataSource = new MatTableDataSource(this.invoiceTypes);
          this.isSelectedInvoiceType = false;
          this.invoiceTypeForm.setValue({ name: null });
        };
      } else {
        this.message = data.message ? data.message : '';
        this.invoiceTypeForm.get('name').setErrors({ 'duplicate': this.message });
      };
    });
  };

  removeInvoiceType(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Invoice Type??",
      message: "Are you sure you want to delete this Invoice Type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    });
    conformation.afterClosed().subscribe(result => {
      if (result == "confirmed") {
        this.invoiceTypeService.deleteInvoiceType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.invoiceTypes.findIndex(a => a.invoiceTypeId == id);
            if (index >= 0) {
              this.invoiceTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.invoiceTypes)
            }
          }
        })
      }
    })
  }

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isSelectedInvoiceType = true;
      if (rowData) {
        this.invoiceTypeId = rowData.invoiceTypeId;
        this.invoiceTypeForm.setValue({ name: rowData.name });
      };
    };
  };

};
