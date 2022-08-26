import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UsersService } from 'app/service/users.service';
import { UserList } from './user-list';

@Component({
  selector: 'app-settings',
  templateUrl: './users.component.html',
  styles: [
    /* language=SCSS */
    `
        tr.mat-row { height: 75px; }
        .mat-row:hover {
          background-color: #F1F5F9;
        }
        .inventory-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 112px auto 112px 72px 40px;
            }

            @screen lg {
                grid-template-columns: 150px 150px auto 250px 96px 96px 100px 40px;
            }
        }
    `
  ],
})
/* grid-template-columns: 48px 112px auto 112px 96px 96px 72px; */
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userList: any[] = [];
  isLoggedIn: boolean = false;
  selectedProductForm: UntypedFormGroup;
  searchTextForModerator: any;
  userListModel: UserList = new UserList();
  displayedColumns: string[] = ['Picture', 'UserName', 'Name', 'Email', 'IsActive', 'LastLoginTime', 'Action'];
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
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsersList(null);
  }

  backToSettings(): void {
    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/settings';
    this._router.navigateByUrl(redirectURL);

  }

  getUsersList(event: any) {
    this.userList = [];
    this.userListModel.PageSize = event?.pageSize ? event.pageSize : this.userListModel.PageSize;
    this.userListModel.PageNumber = event?.pageIndex >= 0 ? (event.pageIndex + 1) : this.userListModel.PageNumber;
    this._userService.GetUserList(this.userListModel.PageNumber, this.userListModel.PageSize).subscribe(res => {
      if (res.success == true) {
        if (res.pageInfo) {
          if (event?.pageIndex >= 0) {
            this.userListModel.PageNumber = res.pageInfo.currentPage - 1;
          } else {
            this.userListModel.PageNumber = res.pageInfo.currentPage;
          }
          this.userListModel.PageSize = res.pageInfo.pageSize;
          this.userListModel.TotalPages = res.pageInfo.totalPages;
          this.userListModel.TotalCount = res.pageInfo.totalCount;
        }
        this.userList = res.data;
        this.userList.forEach(element => {
          if (element.picture != null) {
            let objectURL = element.picture;
            element.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });
        this.dataSource = new MatTableDataSource(this.userList);
      }
      else {
        console.log("Data not found")
      }
    });
  }

  createUser() {
    this._router.navigate(['users/add']);
  }

  back() {
    this._location.back();
  }

  deleteSelectedUser(Id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete user',
      message: 'Are you sure you want to remove this user? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._userService.DeleteUser(Id).subscribe((data) => {
          if (data.success == true) {
            const index = this.userList.findIndex(a => a.userId == Id);
            if (index >= 0) {
              this.userList.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.userList);
            }
          }
        })
      }
    });
  }

  ngActivateDeactivateUser(element: any) {
    element.active = !element.active;
    this._userService.activateDeactivateUser(element.userId, element.active).subscribe(
      (data) => {
        if (data.success == true) {
          this.alert = {
            type: 'success',
            message: 'User updated successfully!!'
          };
          this.showAlert = true;
          setTimeout(()=>{
            this.showAlert = false;
          },2000);
         
        }
      })
  }
}
