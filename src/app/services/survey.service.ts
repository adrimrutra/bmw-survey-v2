import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:4000/api/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  addSurvey(survey: Survey): Observable<Survey>  {
        return this.http.post<Survey>(apiUrl, survey, httpOptions).pipe(
          tap((data: Survey) => console.log(data)),
          catchError(this.handleError<Survey>('addSurvey'))
        );
  }

  getAllSurvey(): Observable<Survey[]>  {
    return this.http.get<Survey[]>(apiUrl);
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
