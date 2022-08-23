import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private _httpClient: HttpClient,) { }
  AddUser(data:any ): Observable<any>
  {
    return this._httpClient.post(environment.APIUrl + 'users', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  GetUser(Id: string): Observable<any>
  {
    return this._httpClient.get(environment.APIUrl + 'users/'+Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
   );
  }

}
