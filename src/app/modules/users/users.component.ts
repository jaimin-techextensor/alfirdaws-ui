import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  backToSettings(): void {
    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/settings';
    this._router.navigateByUrl(redirectURL);

  }
}
