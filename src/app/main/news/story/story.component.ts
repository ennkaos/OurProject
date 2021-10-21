import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewsInterface } from '../newsInterface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  @Input() data!: any;
  result!: any;
  constructor() {}

  ngOnInit(): void {}
}
