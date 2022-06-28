import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FrontendShellBarServiceModule } from '@blueskyfish/frontend-shell-nav-service';
import { FrontendShellBarStoreModule } from '@blueskyfish/frontend-shell-nav-store';
import { FrontendShellBarUiModule } from '@blueskyfish/frontend-shell-nav-ui';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import { FrontendUserApiModule } from '@blueskyfish/frontend-user-api';
import { FrontendUserStoreModule } from '@blueskyfish/frontend-user-store';
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
    FrontendShellBarServiceModule,
    FrontendShellBarStoreModule.forRoot({ actionUrl: environment.actionUrl }),
    FrontendShellBarUiModule,

    RouterModule.forRoot(ROTES, {initialNavigation: 'disabled'}),
    StoreModule.forRoot({}),
    ...(environment.production ? [] : [ StoreDevtoolsModule.instrument(devConfig) ]),
    EffectsModule.forRoot([]),

    AppTanslateModule,

    FrontendUserApiModule.forRoot({
      rootUrl: environment.userApiUrl,
    }),
    FrontendUserStoreModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
