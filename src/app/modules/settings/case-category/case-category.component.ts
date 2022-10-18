import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CaseCategoryService } from './../../../service/case-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-case-category',
  templateUrl: './case-category.component.html',
  styleUrls: ['./case-category.component.scss']
})
export class CaseCategoryComponent implements OnInit {
  displayedColumns = ["Name", "Active", "Action"]
  isCaseCategorySelected: boolean = false;
  caseCategoryForm: UntypedFormGroup;
  caseCategories: any = [];
  dataSource: any;
  isDeletePermission: boolean;
  isEditPermission: any;
  isAddPermission: any;
  message: string;
  caseCategoryId: string;

  constructor(
    private _location: Location,
    private _caseCategoryService: CaseCategoryService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCaseCategories();
    this.caseCategoryForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      active: false
    });
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
  }

  getCaseCategories() {
    this._caseCategoryService.getCaseCategories().subscribe(data => {
      if (data.success == true) {
        this.caseCategories = data.data;
        this.dataSource = new MatTableDataSource(this.caseCategories);
      };
    });
  };

  addCaseCagetory() {
    if (this.caseCategoryForm.invalid) {
      return;
    };
    let caseCategoryModel = {
      name: this.caseCategoryForm.value["name"],
      active: this.caseCategoryForm.value["active"]
    };
    this._caseCategoryService.addCaseCategory(caseCategoryModel).subscribe(data => {
      if (data.success == true) {
        var caseCategory = data.data;
        this.caseCategories.push(caseCategory);
        this.dataSource = new MatTableDataSource(this.caseCategories);
        this.caseCategoryForm.reset();
      } else {
        this.message = data.message ? data.message : "";
        this.caseCategoryForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  };

  editCaseCategory() {
    if (this.caseCategoryForm.invalid) {
      return;
    }
    let caseCategoryModel = {
      name: this.caseCategoryForm.value["name"],
      active: this.caseCategoryForm.value["active"],
      caseCategoryId: this.caseCategoryId
    }
    this._caseCategoryService.editCaseCategory(caseCategoryModel).subscribe(data => {
      if (data.success == true) {
        const index = this.caseCategories.findIndex(a => a.caseCategoryId == this.caseCategoryId);
        if (index >= 0) {
          this.caseCategories[index] = caseCategoryModel;
          this.dataSource = new MatTableDataSource(this.caseCategories);
          this.isCaseCategorySelected = false;
          this.caseCategoryForm.reset();
        } else {
          this.message = data.message ? data.message : "";
          this.caseCategoryForm.get('name').setErrors({ 'duplicate': this.message });
        };
      };
    });
  };

  deleteCaseCategory(id) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Case Category??",
      message: "Are you sure you want to delete this Case Category",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    });
    conformation.afterClosed().subscribe(result => {
      if (result == "confirmed") {
        this._caseCategoryService.deleteCaseCategory(id).subscribe(data => {
          if (data.success == true) {
            const index = this.caseCategories.findIndex(a => a.caseCategoryId == id);
            if (index >= 0) {
              this.caseCategories.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.caseCategories);
            };
          };
        });
      };
    });
  };

  cancel() {
    this.isCaseCategorySelected = false;
    this.caseCategoryForm.setValue({ name: null, active: null });
    this.caseCategoryId = '';
  };

  navigateBack() {
    this._location.back();
  };

  onRowClick(event, rowData) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isCaseCategorySelected = true;
      if (rowData) {
        this.caseCategoryId = rowData.caseCategoryId;
        this.caseCategoryForm.setValue({ name: rowData.name, active: rowData.active })
      };
    };
  };
}
