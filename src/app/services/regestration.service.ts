import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:4000/api/registration';

@Injectable({
  providedIn: 'root'
})
export class RegestrationService {

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User>  {
      return this.http.post<User>(apiUrl, user, httpOptions).pipe(
        tap((data: User) => console.log(data)),
        catchError(this.handleError<User>('addUser'))
      );
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
