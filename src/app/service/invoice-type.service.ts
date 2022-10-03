import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class InvoiceTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getInvoiceTypes(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "invoicetypes").pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  };

  addInvoiceType(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "invoicetypes", data).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  };

  updateInvoiceType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "invoicetypes", data).pipe(
      switchMap((response) => {
        return of(response)
      })
    );
  };

  deleteInvoiceType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "invoicestypes/" + id).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  };
  
}
