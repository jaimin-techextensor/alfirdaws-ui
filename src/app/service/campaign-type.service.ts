import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignTypeService {
  constructor(private _HttpClient: HttpClient) { }

  getCampaginTypes(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "campaigntypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createCampaignType(data: any): Observable<any> {
    return this._HttpClient.post(environment.APIUrl + "campaigntypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  updateCampaignType(data: any): Observable<any> {
    return this._HttpClient.put(environment.APIUrl + "campaigntypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  deleteCampaginType(id: string): Observable<any> {
    return this._HttpClient.delete(environment.APIUrl + "campaigntypes/" + id).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
}