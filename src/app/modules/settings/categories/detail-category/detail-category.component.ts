import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { checkValidPermission } from 'app/core/auth/auth-permission';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})

export class DetailCategoryComponent implements OnInit {
  @Input() categoryDetail: any;


    //Permision properties
    isEditPermission = false;

  constructor(
    private _router: Router
  ) {
   }

  ngOnInit(): void {
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
  }

}