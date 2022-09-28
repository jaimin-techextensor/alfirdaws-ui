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
    )
  }
}
