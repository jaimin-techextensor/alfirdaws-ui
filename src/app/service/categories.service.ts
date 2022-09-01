import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient,) { }


  /*
   * Retrieves all the available roles from the back-end for a specific pageIndex and pageSize
  */
  GetCategoriesList(): Observable<any> {
    return this._httpClient.get(environment.APIUrl + "categories").pipe(
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


  /*
    Creates an new category in the the back-end 
  */
  AddCategory(data: any): Observable<any> {
    return this._httpClient.post(environment.APIUrl + 'categories', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

 /*
    Retrieves the  category by its unique id from the the back-end 
  */
  GetCategoryById(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'categories/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
    Updates the category in the the back-end 
  */
  EditCategory(data: any): Observable<any> {
    return this._httpClient.put(environment.APIUrl + 'categories', data).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

  /*
    Deletes a category by its unique id from the the back-end 
  */
  DeleteCategory(Id: string): Observable<any> {
    return this._httpClient.delete(environment.APIUrl + 'categories/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

//----------------------------------------------------------------------------------
// Sub category API's
//----------------------------------------------------------------------------------
  /*
    Retrieves all subcategories for a specific category
  */
    GetSubCategories(Id: string): Observable<any> {
      return this._httpClient.get(environment.APIUrl + 'categories/' + Id + '/subcategories').pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }

  /*
    Retrieves the  category by its unique id from the the back-end 
  */
  GetSubCategoryById(Id: string): Observable<any> {
    return this._httpClient.get(environment.APIUrl + 'categories/subcategories/' + Id).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }

 /*
    Updates the subcategory in the the back-end 
  */
    EditSubCategory(Id:string, data: any): Observable<any> {
      return this._httpClient.put(environment.APIUrl + 'categories/' + Id + '/subcategories', data).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }

/*
    Creates an new Sub category in the the back-end 
  */
    AddSubCategory(Id:string, data: any): Observable<any> {
      return this._httpClient.post(environment.APIUrl + 'categories/' + Id + '/subcategories', data).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    
    }

 /*
    Deletes a subcategory by its unique id from the the back-end 
  */
    DeleteSubCategory(Id: string): Observable<any> {
      return this._httpClient.delete(environment.APIUrl + 'categories/subcategories/' + Id).pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
    }

}