import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReachTypeService {

  constructor(private _HttpClient: HttpClient) { }

  getReachTypes(): Observable<any> {
    return this._HttpClient.get(environment.APIUrl + "/reachtypes").pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  createReachType(data: any): Observable<any> {
    return this._HttpClient.post(environment.APIUrl + "reachtypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  updateReachType(data: any): Observable<any> {
    return this._HttpClient.put(environment.APIUrl + "reachtypes", data).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

  deleteReachType(id: string): Observable<any> {
    return this._HttpClient.delete(environment.APIUrl + "reachtypes/" + id).pipe(
      switchMap((response: any) => {
        return of(response)
      })
    )
  }

}
