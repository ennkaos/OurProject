import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Countries } from './countries';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}
  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  getWorldData() {
    const url =
      'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world';

    var options = {
      method: 'GET',

      headers: new HttpHeaders({
        'x-rapidapi-host':
          'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': '019a152a52msh1d1ddf38f7b47c3p1ac5e8jsn0477be915fe2',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.get<any>(url, options).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
  getIpLocation() {
    const url = '/api/*';

    var options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http
      .get(url, options)
      .pipe(tap((data) => JSON.stringify(data)));
  }

  getDataFromIpLocation(iplocation: string) {
    let url2: string = `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${iplocation}`;
    var options = {
      method: 'GET',

      headers: {
        'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
        'x-rapidapi-key': '7e9941b9ffmsh65d60c558607c5dp1609f6jsn1e3617eb6888',
        'Access-Control-Allow-Origin': '*',
      },
    };
    return this.http.get(url2, options).pipe(tap((data) => data));
  }
  filterData(array: string[]) {
    return array
      .filter((item, index) => {
        if (
          item === 'ActiveCases' ||
          item === 'TotalCases' ||
          item === 'TotalDeaths' ||
          item === 'TotalRecovered' ||
          item === 'NewCases' ||
          item === 'Case_Fatality_Rate'
        ) {
          return item;
        } else {
          return null;
        }
      })
      .reverse();
  }
  getCountryData() {
    let url3: string = `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/`;
    var options = {
      method: 'GET',

      headers: {
        'x-rapidapi-host':
          'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': '019a152a52msh1d1ddf38f7b47c3p1ac5e8jsn0477be915fe2',
        'Access-Control-Allow-Origin': '*',
      },
    };
    return this.http.get(url3, options).pipe(
      tap((data) => {
        JSON.stringify(data);
      })
    );
  }
  sortAllData(country: string[], countries: any[]): any {
    return countries.filter((item) => {
      if (item.Country.toString() === country[0].toString()) {
        return item;
      } else if (item.Country.toString() === country[1].toString()) {
        return item;
      } else {
        return null;
      }
    });
  }
}
