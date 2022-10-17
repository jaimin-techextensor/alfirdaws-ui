import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseTypeService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCaseTypes(): Observable<any> {
    return (
      this._httpClient.get(environment.APIUrl + "casetypes").pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  };

  addCaseTypes(data: any): Observable<any> {
    return (
      this._httpClient.post(environment.APIUrl + "casetypes", data).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  }

  deleteCaseType(id: string): Observable<any> {
    return (
      this._httpClient.delete(environment.APIUrl + "casetypes/" + id).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  }

  editCaseType(data: any): Observable<any> {
    return (
      this._httpClient.put(environment.APIUrl + "casetypes", data).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  }
}
