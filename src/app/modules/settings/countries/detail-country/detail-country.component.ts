import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { checkValidPermission } from 'app/core/auth/auth-permission';

@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.component.html',
  styleUrls: ['./detail-country.component.scss']
})

export class DetailCountryComponent implements OnInit {
  @Input() countryDetail: any;

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