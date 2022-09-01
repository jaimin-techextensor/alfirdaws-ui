import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModlsService {

  constructor(private _httpClient: HttpClient,) { }


  /*
   * Retrieves all the available roles from the back-end for a specific pageIndex and pageSize
  */
  GetModulesList(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "modules").pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*GetModulesList(pageIndex: number, pageSize: number): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "roles?PageNumber=" + pageIndex + "&PageSize=" + pageSize).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }*/
}