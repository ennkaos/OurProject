import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackerComponent } from '../tracker.component';
import { ContactComponent } from 'src/app/contact/contact.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'tracker', component: TrackerComponent }]),
  ],
})
export class TrackerModule {}