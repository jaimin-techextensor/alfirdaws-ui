import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { CaseTypeService } from './../../../service/case-type.service';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-case-type',
  templateUrl: './case-type.component.html',
  styleUrls: ['./case-type.component.scss']
})
export class CaseTypeComponent implements OnInit {
  displayedColumns: any = ["name", "description", "active", "Action"];
  caseTypeForm: UntypedFormGroup;
  isCaseTypeSelected: boolean = false;
  caseTypes: any = []
  dataSource;
  isDeletePermission: boolean;
  isEditPermission: boolean;
  isAddPermission: boolean;
  selectedRow: any;
  caseTypeId: string;

  constructor(
    private _location: Location,
    private formBuilder: UntypedFormBuilder,
    private _caseTypeService: CaseTypeService,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.caseTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: '',
      active: false
    })
    this.getCaseTypes();
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
  }

  getCaseTypes() {
    this._caseTypeService.getCaseTypes().subscribe(data => {
      if (data.success == true) {
        this.caseTypes = data.data;
        this.dataSource = new MatTableDataSource(this.caseTypes);
      }
    })
  };

  addCaseType() {
    if (this.caseTypeForm.invalid) {
      return;
    }
    let caseModel = {
      name: this.caseTypeForm.value["name"],
      description: this.caseTypeForm.value["description"],
      active: this.caseTypeForm.value["active"]
    }
    this._caseTypeService.addCaseTypes(caseModel).subscribe(data => {
      if (data.success == true) {
        var caseType = data.data;
        this.caseTypes.push(caseType);
        this.dataSource = new MatTableDataSource(this.caseTypes);
        this.caseTypeForm.reset();
      };
    });
  };

  editCaseType() {
    if (this.caseTypeForm.invalid) {
      return;
    }
    let caseModel = {
      name: this.caseTypeForm.value["name"],
      description: this.caseTypeForm.value["description"],
      active: this.caseTypeForm.value["active"],
      caseTypeId: this.caseTypeId
    };
    this._caseTypeService.editCaseType(caseModel).subscribe(data => {
      if (data.success == true) {
        const index = this.caseTypes.findIndex(a => a.caseTypeId == this.caseTypeId);
        if (index >= 0) {
          this.caseTypes[index] = caseModel;
          this.dataSource = new MatTableDataSource(this.caseTypes);
          this.isCaseTypeSelected = false;
          this.caseTypeForm.reset();
        };
      };
    });
  };

  deleteCaseType(id: string) {
    const conformation = this._fuseConfirmationService.open({
      title: "Delete Case Type??",
      message: "Are you sure you want to delete this Case Type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    });
    conformation.afterClosed().subscribe(result => {
      if (result == "confirmed") {
        this._caseTypeService.deleteCaseType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.caseTypes.findIndex(a => a.caseTypeId == id);
            if (index >= 0) {
              this.caseTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.caseTypes);
            };
          };
        });
      };
    });
  };

  cancel() {
    this.isCaseTypeSelected = false;
    this.caseTypeForm.reset();
    this.caseTypeId = '';
  }

  navigateBack() {
    this._location.back();
  }

  onRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isCaseTypeSelected = true;
      if (rowData) {
        this.selectedRow = rowData;
        this.caseTypeId = rowData.caseTypeId;
        this.caseTypeForm.setValue({ name: rowData.name, description: rowData.description, active: rowData.active });
      };
    };
  };

}
