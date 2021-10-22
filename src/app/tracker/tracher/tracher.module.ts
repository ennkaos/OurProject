import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerComponent } from '../tracker.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: 'tracker',
        component: TrackerComponent,
      },
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TracherModule {}
