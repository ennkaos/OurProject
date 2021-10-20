import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators'
import { MainInterface } from './main-interface';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public http:HttpClient) {

  }
  getData() {
    const url:string = "https://covid-19-tracking.p.rapidapi.com/v1"
    let options = {
      method: 'GET',

      headers: new HttpHeaders( {
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
        'x-rapidapi-key': 'b84fcc8200mshfa5aeb97d2bd392p1885f1jsne48d5c16486c',
      })
    }
    return this.http.get<MainInterface[]>(url, options).pipe(
      tap(( data) => console.log(JSON.stringify(data)))
    )
  }
}


