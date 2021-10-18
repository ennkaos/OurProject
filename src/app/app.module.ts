import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { TracherModule } from './tracker/tracher/tracher.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot([
    {
      path: 'home',
      component: MainComponent
    },
    {
      path: 'tracker',
      loadChildren: () => import('./tracker/tracher/tracher.module').then(m => m.TracherModule)
    }

  ])],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
