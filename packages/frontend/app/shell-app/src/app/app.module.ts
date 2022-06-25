import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import { FrontendUserApiModule } from '@blueskyfish/frontend-user-api';
import { FrontendUserStoreModule, UserEffects } from '@blueskyfish/frontend-user-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppTanslateModule } from './app-tanslate.module';
import { AppComponent } from './app.component';
import { devConfig } from './app.config';
import { ROTES } from './app.routing';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    FrontendThemeModule,
    HttpClientModule,
    RouterModule.forRoot(ROTES, {initialNavigation: 'disabled'}),
    StoreModule.forRoot({}),
    ...(environment.production ? [] : [ StoreDevtoolsModule.instrument(devConfig) ]),

    AppTanslateModule,

    FrontendUserApiModule.forRoot({
      rootUrl: environment.userApiUrl,
    }),
    FrontendUserStoreModule,

    EffectsModule.forRoot([
      UserEffects,
    ])
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
