import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrackerModule } from './tracker/tracker/tracker.module';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PageNotFoundComponent,
  ],
  imports: [
    TrackerModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: MainComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'tracker', component: TrackerModule },
      { path: 'contact', component: ContactComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
