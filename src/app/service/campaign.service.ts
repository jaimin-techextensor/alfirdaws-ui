import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  constructor(private _httpClient: HttpClient) { }

  getCampaign(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "campaigns/" + Id).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createCampaign(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "campaigns", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  updateCampaign(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "campaigns", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }


  deleteCampaignByUser(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "campaigns/" + id).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }


  getCampaignsList(pageIndex: number, pageSize: number, searchText: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "campaigns" + "?PageNumber=" + pageIndex + "&SearchText=" + searchText + "&PageSize=" + pageSize).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
}
