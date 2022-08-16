import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList: any;

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
      (data:any) => {
        if (data.success == true) {
          this.userList = data
          console.log(data);
        }
        else{
          console.log("Data not found")
        }
      }
    );
  }
}
