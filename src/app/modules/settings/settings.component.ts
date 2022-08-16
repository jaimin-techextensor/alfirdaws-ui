import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  counterList: any;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.settingsCounter();
    this._httpClient.get(environment.APIUrl + 'settings/counters').subscribe(
      async (data: any) => {
        if (data.success == true) {
          this.counterList = await data.data;
          console.log(data);
        }
        else{
          console.log("Data not found")
        }
      });
  }

  async settingsCounter() {
    debugger;
    
  }

}
