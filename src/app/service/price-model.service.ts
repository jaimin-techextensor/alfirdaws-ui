import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceModelService {

  constructor(private _httpClient: HttpClient) { }

  getPriceModel(pageIndex: number, pageSize: number, searchText: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "pricingmodels" + "?PageNumber=" + pageIndex + "&SearchText=" + searchText + "&PageSize=" + pageSize).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  addPriceModel(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "pricingmodels", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  updatePriceModel(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "pricingmodels", data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  getPriceModelById(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "pricingmodels/" + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  deletePriceModel(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "pricingmodels/" + id).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }

}
