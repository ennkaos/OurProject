import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewsInterface } from './newsInterface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(public http: HttpClient) {}
  getNews(page: number): Observable<any> {
    const url: string = `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/${page}`;
    var options = {
      method: 'GET',

      headers: {
        'x-rapidapi-host':
          'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        'x-rapidapi-key': '019a152a52msh1d1ddf38f7b47c3p1ac5e8jsn0477be915fe2',
      },
    };
    return this.http.get(url, options).pipe(
      tap((item) => {
        console.log(JSON.stringify(item));
      })
    );
  }
}
