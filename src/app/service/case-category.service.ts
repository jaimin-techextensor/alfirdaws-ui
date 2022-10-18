import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseCategoryService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCaseCategories(): Observable<any> {
    return (
      this._httpClient.get(environment.APIUrl + "casecategory").pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    );
  };

  addCaseCategory(data: any): Observable<any> {
    return (
      this._httpClient.post(environment.APIUrl + "casecategory", data).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  }

  editCaseCategory(data: any): Observable<any> {
    return (
      this._httpClient.put(environment.APIUrl + "casecategory", data).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  }
  
  deleteCaseCategory(id: string): Observable<any> {
    return (
      this._httpClient.delete(environment.APIUrl + "casecategory/" + id).pipe(
        switchMap((response) => {
          return of(response);
        })
      )
    )
  };
}