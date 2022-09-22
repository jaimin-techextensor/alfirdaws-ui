import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  constructor(private _HttpClient: HttpClient) { }

  getCampaign(Id: string): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "campaigns/" + Id).pipe(
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

  getCampaginsList(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "campaigns").pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }

  deleteCampaginByUser(id: string): Observable<any> {
    return this._HttpClient.delete(environment.APIUrl + "campaigns/" + id).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }
}
