import { Component, OnInit } from '@angular/core';
import { MainInterface } from './main-interface';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public results!:MainInterface[]
  constructor(public mainservice:MainService) {

  }

  ngOnInit(): void {
    this.mainservice.getData().subscribe({
      next: (data) => {
        this.results = data
      },
      error: (err) => console.log(err)
    })
  }

}
