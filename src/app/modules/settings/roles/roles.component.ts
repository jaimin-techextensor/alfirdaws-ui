import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { RolesService } from 'app/service/roles.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-settings',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

/* grid-template-columns: 48px 112px auto 112px 96px 96px 72px; */
export class RolesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rolesList: any[] = [];
  isLoggedIn: boolean = false;

  searchTextForModerator: any;
  displayedColumns: string[] = ['RoleName', 'Type', 'Description', 'Action'];
  dataSource: any;
  pageEvent: PageEvent;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private _fuseConfirmationService: FuseConfirmationService,
    private _location: Location,
    private _roleService: RolesService
  ) { }

  ngOnInit(): void {
    this.getRolesList(null);
  }

  /*
    Retrieves the list of all roles from the back-end
  */
  getRolesList(event: any) {
    this.rolesList = [];

    this._roleService.GetRolesList().subscribe(res => {
      if (res.success == true) { 
        this.rolesList = res.data;
        this.dataSource = new MatTableDataSource(this.rolesList);
      }
      else {
        console.log("Data not found")
      }
    });

  }

 /*
    Navigate to the create role screen 
  */
  createRole() {
    this._router.navigate(['roles/add']);
  }


  /*
    Navigate back to the previous screen
  */
  navigateback() {
    this._location.back();
  }

  /*
    Deletes the selected role and its permissions
  */
    deleteSelectedRole(Id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete role',
      message: 'Are you sure you want to remove this role? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._roleService.DeleteRole(Id).subscribe((data) => {
          if (data.success == true) {
            const index = this.rolesList.findIndex(a => a.roleId == Id);
            if (index >= 0) {
              this.rolesList.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.rolesList);
            }
          }
        })
      }
    });
  }

}
