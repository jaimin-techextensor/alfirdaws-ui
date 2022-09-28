import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPaymentTypes(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'paymenttypes').pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }

  addPaymentType(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "paymenttypes", data).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }

  editPaymentType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'paymenttypes', data).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }

  deletePaymentType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + 'paymenttypes/' + id).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }
}
