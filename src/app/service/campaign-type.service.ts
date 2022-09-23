import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignTypeService {
  constructor(private _httpClient: HttpClient) { }

  getcampaignTypes(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "campaigntypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createCampaignType(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "campaigntypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  updateCampaignType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "campaigntypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  deleteCampaignType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "campaigntypes/" + id).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }
}