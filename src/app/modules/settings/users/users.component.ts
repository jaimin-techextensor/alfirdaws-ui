import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common'
@Component({
  selector: 'app-settings',
  templateUrl: './users.component.html',
  styles: [
    /* language=SCSS */
    `
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

  userList: any[] = [];
  isLoggedIn: boolean = false;
  selectedProductForm: UntypedFormGroup;
  searchTextForModerator: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private _fuseConfirmationService: FuseConfirmationService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.geUsersList();
  }

  backToSettings(): void {
    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/settings';
    this._router.navigateByUrl(redirectURL);

  }

  geUsersList() {
    this._httpClient.get(environment.APIUrl + 'users').subscribe(
      (data: any) => {
        if (data.success == true) {
          //debugger
          this.userList = data.data
          this.userList.forEach(element => {
            if(element.picture != null){
              let objectURL = 'data:image/png;base64,' + element.picture;
              element.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
         });
        }
        else {
          console.log("Data not found")
        }
      }
    );
  }
  createUser()
  {
    this._router.navigate(['users/add']);
  }
  back()
  {
    this._location.back();
  }

/**
     * Delete the selected user using the form data
     */
 deleteSelectedUser(): void
 {
     // Open the confirmation dialog
     const confirmation = this._fuseConfirmationService.open({
         title  : 'Delete user',
         message: 'Are you sure you want to remove this user? This action cannot be undone!',
         actions: {
             confirm: {
                 label: 'Delete'
             }
         }
     });

     // Subscribe to the confirmation dialog closed action
     confirmation.afterClosed().subscribe((result) => {

         // If the confirm button pressed...
         if ( result === 'confirmed' )
         {
           /*
             // Get the user object
             const product = this.selectedProductForm.getRawValue();

             // Delete the user on the server
             this._inventoryService.deleteProduct(product.id).subscribe(() => {

               // Refresh the user list
               //this.closeDetails();
             });*/
         }
     });
 }



}