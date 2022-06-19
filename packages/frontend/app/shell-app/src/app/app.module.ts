import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import { AppComponent } from './app.component';
import { ROTES } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FrontendThemeModule,

    RouterModule.forRoot(ROTES, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
