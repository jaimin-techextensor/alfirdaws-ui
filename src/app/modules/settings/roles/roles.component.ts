import { PageRequestModel } from './../users/page-request';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { RolesService } from 'app/service/roles.service';
import { checkValidPermission } from 'app/core/auth/auth-permission';

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

  roleListModel: PageRequestModel = new PageRequestModel();
  searchTextForModerator: any;
  displayedColumns: string[] = ['RoleName', 'Type', 'Description', 'Action'];
  dataSource: any;
  pageEvent: PageEvent;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert = false;
  isDeletePermission = false;
  isEditPermission = false;
  isAddPermission = false;

  constructor(
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    private _location: Location,
    private _roleService: RolesService
  ) { }

  ngOnInit(): void {
    this.getRolesList(null);
    this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
    this.isAddPermission = checkValidPermission(this._router.url, 'add');
  }

  /*
    Retrieves the list of all roles from the back-end
  */
  getRolesList(event: any, isSearch: boolean = false) {
    this.rolesList = [];
    this.roleListModel.PageSize = event?.pageSize ? event.pageSize : this.roleListModel.PageSize;
    this.roleListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.roleListModel.PageNumber;
    if (isSearch) {
      if (this.searchTextForModerator.length > 0 && this.searchTextForModerator.length <= 2) {
        return;
      } else {
        this.roleListModel.SearchText = this.searchTextForModerator ? this.searchTextForModerator : null
      }
    } else {
      this.roleListModel.SearchText = null;
    }
    this._roleService.getRolesList(this.roleListModel.PageNumber, this.roleListModel.PageSize, this.roleListModel.SearchText).subscribe(res => {
      if (res.success == true) {

        if (res.pageInfo) {
          if (event?.pageIndex >= 0) {
            this.roleListModel.PageNumber = res.pageInfo.currentPage - 1;
          }
          else {
            this.roleListModel.PageNumber = res.pageInfo.currentPage;
          }
          this.roleListModel.PageSize = res.pageInfo.pageSize;
          this.roleListModel.TotalPages = res.pageInfo.totalPages;
          this.roleListModel.TotalCount = res.pageInfo.totalCount;
        }
        this.rolesList = res.data;
        this.dataSource = new MatTableDataSource(this.rolesList);
      }
      else {
        //console.log("Data not found")
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
