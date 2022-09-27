import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, of, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AddressTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getAddressTypeList(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "addresstypes").pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  addAddressType(addressModel: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "addresstypes", addressModel).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }
  
  editAddressType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "addresstypes", data).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }

  deleteAddressType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "addresstypes/" + id).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }
}
