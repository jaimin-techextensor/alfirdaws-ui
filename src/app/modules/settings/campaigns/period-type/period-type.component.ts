import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodTypeService } from 'app/service/period-type.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-period-type',
  templateUrl: './period-type.component.html',
  styleUrls: ['./period-type.component.scss']
})

export class PeriodTypeComponent implements OnInit {
  constructor(
    private router: Router,
    private _periodService: PeriodTypeService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  periodTypeForm: UntypedFormGroup
  periodDisplayedColumns = ["Name", "NumberOfDays", "Action"]
  periodTypes: any = []
  dataSource: any;
  isSelectedPeriodType = false;
  selectedPeriodType: any;
  periodTypeId: string;
  errorMessage: string = "";

  ngOnInit(): void {
    this.periodTypeForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      numberOfDays: ["", [Validators.required]]
    })
    this._periodService.getPeriodTypes().subscribe(data => {
      this.periodTypes = data.data;
      this.dataSource = new MatTableDataSource(this.periodTypes);
    })
  }

  navigateBack() {
    this.router.navigate(['campaigns']);
  }

  addPeriodType() {
    let periodModel = {
      name: this.periodTypeForm.value["name"],
      nrOfDays: this.periodTypeForm.value["numberOfDays"]
    }
    if (this.periodTypeForm.invalid) {
      return;
    }
    if (this.periodTypeForm.value["numberOfDays"] === 0) {
      this.errorMessage = "Number of days should be greater than 0!";
      this.periodTypeForm.get("numberOfDays").setErrors({ 'notZero': this.errorMessage })
      return;
    }
    this._periodService.createPeriodType(periodModel).subscribe(data => {
      if (data.success == true) {
        this.periodTypes.push(periodModel);
        this.dataSource = new MatTableDataSource(this.periodTypes);
        this.periodTypeForm.clearValidators();
        this.periodTypeForm.reset();
      } else {
        this.errorMessage = data.message ? data.message : '';
        this.periodTypeForm.get("name").setErrors({ 'duplicate': this.errorMessage })
      }
    })
  }

  editPeriodType() {
    if (this.periodTypeForm.invalid) {
      return;
    }
    if (this.periodTypeForm.value["numberOfDays"] === 0) {
      this.errorMessage = "Number of days should be greater than 0!";
      this.periodTypeForm.get("numberOfDays").setErrors({ 'notZero': this.errorMessage })
      return;
    }
    let periodModel = {
      name: this.periodTypeForm.value["name"],
      nrOfDays: this.periodTypeForm.value["numberOfDays"],
      periodTypeId: this.periodTypeId
    };
    this._periodService.updatePeriodType(periodModel).subscribe(data => {
      if (data.success == true) {
        const index = this.periodTypes.findIndex(a => a.periodTypeId == this.periodTypeId);
        if (index >= 0) {
          let periodData = {
            name: this.periodTypeForm.value["name"],
            periodTypeId: this.periodTypeId,
            nrOfDays: this.periodTypeForm.value["numberOfDays"]
          };
          this.periodTypes[index] = periodData;
          this.dataSource = new MatTableDataSource(this.periodTypes);
          this.isSelectedPeriodType = false;
          this.selectedPeriodType = null;
          this.periodTypeId = "";
          this.periodTypeForm.setValue({ name: null, numberOfDays: null });
        }
      } else {
        this.errorMessage = data.message ? data.message : '';
        this.periodTypeForm.get("name").setErrors({ 'duplicate': this.errorMessage })
      }
    })
  }

  cancel() {
    this.isSelectedPeriodType = false;
    this.selectedPeriodType = null;
    this.periodTypeId = "";
    this.periodTypeForm.setValue({ name: null, no: null });
  }

  deletePeriodType(id: string) {
    const conform = this._fuseConfirmationService.open({
      title: "Delete period type??",
      message: "Are you sure you want to delete this period type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    conform.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        this._periodService.deletePeriodType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.periodTypes.findIndex(a => a.periodTypeId == id);
            if (index >= 0) {
              this.periodTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.periodTypes);
              this.periodTypeForm.clearValidators();
              this.periodTypeForm.reset();
              this.periodTypeForm.enable();
            }
          }
        })
      }
    })
  }

  onRowClick(event, row) {
    if (!(event.srcElement instanceof SVGElement)) {
      this.isSelectedPeriodType = true;
      if (row) {
        this.selectedPeriodType = row;
        this.periodTypeId = row.periodTypeId;
        this.periodTypeForm.setValue({ name: this.selectedPeriodType.name, numberOfDays: this.selectedPeriodType.nrOfDays })
      }
    }
  }
}
