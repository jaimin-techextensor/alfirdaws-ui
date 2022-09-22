import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _httpClient: HttpClient) { }

  getCounters() {
    return this._httpClient.get(environment.APIUrl + "settings/counters").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
}
