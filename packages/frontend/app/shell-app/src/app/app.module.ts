import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import { FrontendUserApiModule } from '@blueskyfish/frontend/lib/user-api';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ROTES } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FrontendThemeModule,
    HttpClientModule,

    RouterModule.forRoot(ROTES, { initialNavigation: 'enabledBlocking' }),

    FrontendUserApiModule.forRoot({
      rootUrl: environment.userApiUrl,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
