import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private _httpClient: HttpClient,) { }

   /*
   * Retrieves all the available countries from the back-end 
  */
   GetCountries(): Observable<any> {
        return this._httpClient.get(environment.APIUrl + "countries").pipe(
            switchMap((response: any) => {
            return of(response);
            })
        );
    }

 /*
    Deletes a category by its unique id from the the back-end 
  */
    DeleteCountry(Id: string): Observable<any> {
        return this._httpClient.delete(environment.APIUrl + 'countries/' + Id).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }

}