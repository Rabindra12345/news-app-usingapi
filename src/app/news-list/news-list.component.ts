import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.http.get<any>('https://newsapi.org/v2/top-headlines?country=us&apiKey=4d2552b23526480aaab65d3c84711eda').subscribe(response => {
      this.newsList = response.articles.sort((a: any, b: any) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    });
  }
  

  showFullDescription(newsItem: any): void {
    this.newsList.forEach(item => {
      if (item === newsItem) {
        item.showFullDescription = true;
      } else {
        item.showFullDescription = false;
      }
    });
  }
  
}
