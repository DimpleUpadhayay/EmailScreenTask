import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }
  readonly ROOT_URL = 'http://localhost:3000'
  // login api request
  login(data) {
    // let url: string = `${environment.baseUrl}/signin`;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.ROOT_URL}/login`,data).pipe(
      map(user => {
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          // localStorage.setItem(
          //   "access_token",user["access_token"]
          // );
          // this.currentUserSubject.next(user);
        }
        return true;
      }),
       catchError(this.handleError)
    );
  }
//getReportList
getReportList() {
  let url: string = `${this.ROOT_URL}/reportList`;
  return this.httpClient.get(url).pipe(catchError(this.handleError));
}
getUsersList() {
  let url: string = `${this.ROOT_URL}/users`;
  return this.httpClient.get(url).pipe(catchError(this.handleError));
}
postReportListData(reportId,params)
{
  let url: string = `${this.ROOT_URL}/reportList`;
  return this.httpClient.patch(`${url}/${reportId}`,params).pipe(catchError(this.handleError));
}

  //HttpClicnt Error Handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    console.error(error);
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
