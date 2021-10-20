import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TrackerComponent} from '../tracker.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'tracker',
        component: TrackerComponent
      }
    ])

  ]
})
export class TracherModule { }
