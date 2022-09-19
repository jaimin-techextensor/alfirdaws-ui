import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ReachService } from 'app/service/reach.service';

@Component({
  selector: 'app-reach-type',
  templateUrl: './reach-type.component.html',
  styleUrls: ['./reach-type.component.scss']
})
export class ReachTypeComponent implements OnInit {

  constructor(
    private _location: Location,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _reachService: ReachService
  ) { }

  dataSource: any;
  displayedColumns: string[] = ['Reach Types', 'Action'];
  reachTypes: any = []
  isReachTypeSelected: boolean = false;
  reachTypeForm: UntypedFormGroup;
  reachTypeId: string;
  selectedReachType: any;
  message: any = "";

  ngOnInit(): void {
    this._reachService.getReachTypes().subscribe(data => {
      this.reachTypes = data.data;
      this.dataSource = new MatTableDataSource(this.reachTypes);
    })

    this.reachTypeForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  navigateBack() {

    this._location.back();
  }

  addReachTypes() {
    this.isReachTypeSelected = false;
    let reachModel = {
      name: this.reachTypeForm.value["name"],
    }
    if (this.reachTypeForm.invalid) {
      return;
    }
    this._reachService.createReachType(reachModel).subscribe((data) => {
      if (data.success == true) {
        this.reachTypes.push(reachModel);
        this.dataSource = new MatTableDataSource(this.reachTypes);
        this.reachTypeForm.clearValidators();
        this.reachTypeForm.reset();
        this.reachTypeForm.enable();
      }
      else {
        this.message = data.message ? data.message : '';
        this.reachTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  editReachType() {
    if (this.reachTypeForm.invalid) {
      return;
    }
    let reachModel = {
      name: this.reachTypeForm.value["name"],
      reachtypeId: this.reachTypeId
    }
    this._reachService.updateReachType(reachModel).subscribe((data: any) => {
      if (data.success == true) {
        const index = this.reachTypes.findIndex(a => a.reachTypeId == this.reachTypeId)
        if (index >= 0) {
          let reachTypeData = {
            name: this.reachTypeForm.value["name"],
            reachTypeId: this.reachTypeId
          }
          this.reachTypes[index] = reachTypeData;
          this.dataSource = new MatTableDataSource(this.reachTypes);
        }
        this.reachTypeForm.enable();
        this.reachTypeForm.reset();
        this.isReachTypeSelected = false;
      }
      else {
        this.message = data.message ? data.message : '';
        this.reachTypeForm.get('name').setErrors({ 'duplicate': this.message });
      }
    })
  }

  cancelReachType() {
    this.isReachTypeSelected = false;
    this.selectedReachType = null;
    this.reachTypeId = "";
    this.reachTypeForm.setValue({ name: null });
  }

  deleteReachType(id: string) {
    const confirmation = this._fuseConfirmationService.open({
      title: "Delete reach Type?",
      message: "Are you sure you want to delete this Reach type",
      actions: {
        confirm: {
          label: "Delete"
        }
      }
    })
    confirmation.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        this._reachService.deleteReachType(id).subscribe(data => {
          if (data.success == true) {
            const index = this.reachTypes.findIndex(a => a.reachTypeId === id);
            if (index >= 0) {
              this.reachTypes.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.reachTypes);
              this.reachTypeForm.clearValidators();
              this.reachTypeForm.reset();
              this.reachTypeForm.enable();
            }
          }
        })
      }
    })
  }

  onReachRowClick(event: any, rowData: any) {
    if (!(event.srcElement instanceof SVGAElement)) {
      this.isReachTypeSelected = true;
      if (rowData) {
        this.selectedReachType = rowData;
        this.reachTypeId = rowData.reachTypeId
        this.reachTypeForm.setValue({ name: this.selectedReachType.name });
      }
    }
  }
}
