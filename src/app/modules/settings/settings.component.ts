import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  counterList: any;

  constructor(
      private _httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.settingsCounter();
    this._httpClient.get(environment.APIUrl + 'settings/counters').subscribe(
      async (data: any) => {
        if (data.success == true) {
          this.counterList = await data.data;
        }
      });
  }

  async settingsCounter() {
  }

  navigateToUsers() {
    this.router.navigateByUrl('/users');
  }

  navigateToRoles() {
    this.router.navigateByUrl('/roles');
  }

  navigateToModules() {
    this.router.navigateByUrl('/modules');
  }

  navigateToCategories() {
    this.router.navigateByUrl('/categories');
  }

  navigateToCountries() {
    this.router.navigateByUrl('/countries');
  }
}
