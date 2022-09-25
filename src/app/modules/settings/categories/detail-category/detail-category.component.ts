import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { checkValidPermission } from 'app/core/auth/auth-permission';
import { CategoriesService } from 'app/service/categories.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})

export class DetailCategoryComponent implements OnInit {
  //Input parameter
  @Input() categoryDetail: any;
  
  //Permision properties
  isEditPermission = false;

  //*------------------------------------------------------------------------
  // Constructor
  //------------------------------------------------------------------------*/  
  constructor(
    private _router: Router,
    private _categoriesService: CategoriesService
    ) {}


  //*------------------------------------------------------------------------
  // Initialisatio of the page - Set permissions
  //------------------------------------------------------------------------*/
  ngOnInit(): void {
    this.isEditPermission = checkValidPermission(this._router.url, 'edit');
  }


  //*------------------------------------------------------------------------
  // Activates / Deactivates a specific sub category
  //------------------------------------------------------------------------*/
  toggleActivationSubCategory(subCategoryId:string){

    const index = this.categoryDetail.subcategories.findIndex(a => a.subCategoryId == subCategoryId);
    const isActive: boolean =  !this.categoryDetail.subcategories[index].active;

    this._categoriesService.ActivateSubCategory(subCategoryId, isActive).subscribe(
      (data) => {
        if (data.success == true) {  
          if (index >= 0) {
            this.categoryDetail.subcategories[index].active = !this.categoryDetail.subcategories[index].active;
          }
        }
      }
    )
  }

}