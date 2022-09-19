import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checkValidPermission } from 'app/core/auth/auth-permission';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})

export class UserDetailDialogComponent implements OnInit {
  @Input() userDetail: any;

  //Permision properties
  isEditPermission = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Sets the permissions for the CRUD actions
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
  }

}
