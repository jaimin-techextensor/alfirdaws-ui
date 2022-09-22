import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PeriodTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPeriodTypes(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "periodtypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createPeriodType(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + "periodtypes", data).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }

  updatePeriodType(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + "periodtypes", data).pipe(
      switchMap((response) => {
        return of(response)
      })
    )
  }

  deletePeriodType(id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + "periodtypes/" + id).pipe(
      switchMap((response) => {
        return of(response);
      })
    )
  }
}
