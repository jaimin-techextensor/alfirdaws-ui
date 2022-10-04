import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VatTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getVatTypes(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "vattypes").pipe(
      switchMap((response) => {
        return of(response)
      })
    );
  };

  addVatType(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "vattypes", data).pipe(
      switchMap((response) => {
        return of(response)
      })
    );
  };

  updateVatType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "vattypes", data).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  };

  deleteVatType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "vattypes/" + id).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  };

}
