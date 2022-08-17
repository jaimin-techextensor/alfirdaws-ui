import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
                grid-template-columns: 48px 112px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 150px 150px auto 250px 96px 96px 100px;
            }
        }
    `
  ],
})
/* grid-template-columns: 48px 112px auto 112px 96px 96px 72px; */
export class UsersComponent implements OnInit {

  userList: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.geUsersList();
  }

  backToSettings(): void {
    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/settings';
    this._router.navigateByUrl(redirectURL);

  }

  geUsersList() {
    debugger;
    this._httpClient.get(environment.APIUrl + 'users').subscribe(
      (data: any) => {
        debugger
        if (data.success == true) {
          this.userList = data.data
          this.isLoggedIn = this.userList.length > 0;

          console.log(data.data[0]);
        }
        else {
          console.log("Data not found")
        }
      }
    );
  }
}
