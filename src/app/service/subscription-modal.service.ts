import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionModalService {

  constructor(private _httpClient: HttpClient) {

  }
  getSubscriptionModal(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "subscriptionmodels/" + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  createSubscriptionModal(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "subscriptionmodels", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  updateSubscriptionModal(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "subscriptionmodels", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

}
