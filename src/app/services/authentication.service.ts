import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlLogin = 'http://localhost:4000/api/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<User>  {
      return this.http.post<User>(apiUrlLogin, user, httpOptions).pipe(
        tap((data: User) => console.log(data)),
        catchError(this.handleError<User>('loginUser'))
      );
  }

  logoutUser(user: User): Observable<User>  {
    return null;
    // return this.http.get<User>(apiUrlLogin, user).pipe(
    //   tap((data: User) => console.log(data)),
    //   catchError(this.handleError<User>('logoutUser'))
    // );
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
