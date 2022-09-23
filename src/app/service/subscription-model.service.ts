import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionModelService {

  constructor(private _httpClient: HttpClient) { }

  getSubscriptionModel(pageIndex: number, pageSize: number, searchText: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "subscriptionmodels" + "?PageNumber=" + pageIndex + "&SearchText=" + searchText + "&PageSize=" + pageSize).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  deleteSubscriptionModel(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "subscriptionmodels/" + id).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }
}
