import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCampaignService {

  constructor(private _HttpClient: HttpClient) { }

  getCampaginTypes(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "/campaigntypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  getPeriodTypes(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "/periodtypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  getReachTypes(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "/reachtypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createCampaign(data: any): Observable<any> {
    return this._HttpClient.post(environment.APIUrl + "campaigns", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  updateCampaign(data: any): Observable<any> {
    return this._HttpClient.put(environment.APIUrl + "campaigns", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }
}
