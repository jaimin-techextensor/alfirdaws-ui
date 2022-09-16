import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { CategoriesService } from 'app/service/categories.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDrawer } from '@angular/material/sidenav';
import { checkValidPermission } from 'app/core/auth/auth-permission';

@Component({
  selector: 'app-settings',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    categoriesList: any[] = [];
    displayedColumns: string[] = ['Icon', 'Sequence', 'Name', 'countSubcategories', 'Active', 'Action'];
    dataSource: any;

    drawerMode: 'over';
    selectedCategory:any;
    visible: boolean = false;

    searchTextForModerator: any;
    alert: { type: FuseAlertType; message: string } = {
             type: 'success',
              message: ''
     };
    showAlert = false;

    //Permision properties
    isDeletePermission = false;
    isEditPermission = false;
    isAddPermission = false;

  constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private sanitizer: DomSanitizer,
        private _fuseConfirmationService: FuseConfirmationService,
        private _location: Location,
        private _categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
      
      // Retrieves the list of all categories
      this.getCategoriesList();
      
      // Sets the permissions for the CRUD actions
      this.isDeletePermission = checkValidPermission(this._router.url, 'delete');
      this.isEditPermission = checkValidPermission(this._router.url, 'edit');
      this.isAddPermission = checkValidPermission(this._router.url, 'add');
   }


  // -------------------------------------------------------------------------
  // Navigate back to the previous screen
  // -------------------------------------------------------------------------
  navigateback() {
        this._location.back();
    }


  // -------------------------------------------------------------------------
  //  Retrieves the list of all modules from the back-end
  // -------------------------------------------------------------------------
  getCategoriesList() {
    this.categoriesList = [];

    this._categoriesService.GetCategoriesList().subscribe(res => {
      if (res.success == true) { 
        this.categoriesList = res.data;
        this.categoriesList.forEach(element => {
            if (element.icon != null) {
              let objectURL = element.icon;
              element.icon = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
          });
        this.dataSource = new MatTableDataSource(this.categoriesList);
      }
      else {
        console.log("Data not found")
      }
    });
  }

  // -------------------------------------------------------------------------
  //  Deletes a category from the list
  // -------------------------------------------------------------------------
  deleteSelectedCategory(Id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete user',
      message: 'Are you sure you want to remove this category? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._categoriesService.DeleteCategory(Id).subscribe((data) => {
          if (data.success == true) {
            const index = this.categoriesList.findIndex(a => a.categoryId == Id);
            if (index >= 0) {
              this.categoriesList.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.categoriesList);
            }
          }
        })
      }
    });
  }

  // -------------------------------------------------------------------------
  // Closed the overlay screen.
  // -------------------------------------------------------------------------
  onBackdropClicked() {
    this.visible = !this.visible;
  }

  // -------------------------------------------------------------------------
  // Click event when a row is clicked
  // -------------------------------------------------------------------------
  onRowClick(event: any, rowData: any) { 
    if (!(event.srcElement instanceof SVGElement)) {
      this.visible = true;
      if (rowData) {
        this.selectedCategory = rowData;
      }
    }
  }

}