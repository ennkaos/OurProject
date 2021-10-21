import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NewsService } from './news.service';
import { NewsInterface } from './newsInterface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy {
  news$!: any;

  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews(1).subscribe({
      next: (item) => {
        this.news$ = item;
        this.news$ = Array.of(this.news$);
      },
      error: (error) => console.log(error),
    });
  }
  ngOnDestroy(): void {
    this.news$.unsubscribe();
  }
}
