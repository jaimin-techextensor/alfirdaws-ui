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
    debugger
    return this._httpClient.post(environment.APIUrl + 'users', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  GetUser(Id: number)
  {
    debugger
    this._httpClient.get(environment.APIUrl + 'users'+Id).subscribe(
      async (data: any) => {
        debugger
        if (data.success == true) {
          return data.Data
          console.log(data);
        }
        else{
          console.log("Data not found")

        }
      });
  }

}
