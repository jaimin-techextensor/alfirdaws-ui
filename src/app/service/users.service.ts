import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient,) { }

  GetUserList(pageIndex: number, pageSize: number, searchText: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "users?PageNumber=" + pageIndex + "&PageSize=" + pageSize + "&SearchText=" + searchText).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  AddUser(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'users', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  EditUser(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'users', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  GetUser(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'users/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  DeleteUser(Id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + 'users/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
  activateDeactivateUser(id: number, isActive: boolean): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'users/' + id + '?isActive=' + isActive, null).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
  * Assigns a role to a specific user in the back-end
  */
  AssignRole(userId: string, roleId: string): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'users/' + userId + '/assignrole/' + roleId, null).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
  * Removes a role for a specific user in the back-end
  */
  RemoveRole(userId: string, roleId: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + 'users/' + userId + '/removerole/' + roleId).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
}
