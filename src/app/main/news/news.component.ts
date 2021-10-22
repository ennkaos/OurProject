import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NewsService } from './news.service';
import { NewsInterface } from './newsInterface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy, OnChanges {
  news$!: any;
  nextPage!: any;
  isFirst!: boolean;
  previousPage!: any;
  newsSubscription!: Subscription;
  page: number = 0;

  constructor(public newsService: NewsService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.SetPage();
    this.SetPageReturn;
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.newsSubscription = this.newsService.getNews(this.page).subscribe({
      next: (item) => {
        this.news$ = item.news;
      },
      error: (error) => console.log(error),
    });
    this.isFirst = true;
  }
  SetPage() {
    if (this.page === 0 || this.page > 0) {
      this.page++;
      this.isFirst = false;
    } else {
      this.page === 0;
      this.isFirst = true;
    }
    this.newsSubscription.unsubscribe();
    console.log(this.page);
    this.newsSubscription = this.newsService.getNews(this.page).subscribe({
      next: (item) => {
        this.news$ = item.news;
      },
      error: (error) => console.log(error),
    });
    console.log('Merge Functia');
  }
  SetPageReturn() {
    if (this.page > 0) {
      this.page--;
      this.isFirst = false;
    } else {
      this.page === 0;
      this.isFirst = true;
    }

    this.newsSubscription.unsubscribe();
    console.log(this.page);
    this.newsSubscription = this.newsService.getNews(this.page).subscribe({
      next: (item) => {
        this.news$ = item.news;
      },
      error: (error) => console.log(error),
    });
    console.log('Merge Functia');
  }

  ngOnDestroy(): void {}
}
