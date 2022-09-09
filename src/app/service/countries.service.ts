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
    Creates an new countriy in the the back-end 
  */
  AddCountry(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'countries', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

 /*
    Retrieves the  country by its unique id from the the back-end 
  */
  GetCountryById(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'countries/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
    Updates the country in the the back-end 
  */
  EditCountry(Id: string, data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'countries/' + Id, data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

 /*
    Deletes a country by its unique id from the the back-end 
  */
    DeleteCountry(Id: string): Observable<any> {
        return this._httpClient.delete(environment.APIUrl + 'countries/' + Id).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }


  /*
    Creates an new region for a specific country in the the back-end 
  */
  AddRegion(Id: string, data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'countries/' + Id + '/regions', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

   /*
    Updates the region for a specific country in the the back-end 
  */
    EditRegion(countryId: string, regionId:string, data: any): Observable<any> {
      return this._httpClient.put(environment.APIUrl + 'countries/' + countryId + '/regions/' + regionId, data).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }
  

  /*
    Deletes a region by its unique id from the the back-end 
  */
    DeleteRegion(Id: string): Observable<any> {
      return this._httpClient.delete(environment.APIUrl + 'countries/regions/' + Id).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

}