import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _httpClient: HttpClient,) { }


  /*
   * Retrieves all the available roles from the back-end for a specific pageIndex and pageSize
  */
  getRolesList(pageIndex: number, pageSize: number, searchText: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "roles?PageNumber=" + pageIndex + "&PageSize=" + pageSize + "&SearchText=" + searchText).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
    * Creates an new role in the the back-end 
   */
  AddRole(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'roles', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
  * Edits an  role in the the back-end 
 */
  EditRole(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'roles', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
    * Gets a  role from the the back-end 
   */
  GetRole(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'roles/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );

  }

  /*
   * Deletes a specific role from the back-end 
  */
  DeleteRole(Id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + 'roles/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  // get Role models

  getRolesModels(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'modules/').pipe(
      switchMap((response: any) => {
        console.log('responseresponse', response);
        return of(response);
      })
    );

  }
}
