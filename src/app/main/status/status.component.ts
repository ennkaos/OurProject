import { Component, Input, OnInit } from '@angular/core';
import { Countries } from '../countries';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  @Input() name!: string;
  @Input() data!: any;
  @Input() colors!: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
