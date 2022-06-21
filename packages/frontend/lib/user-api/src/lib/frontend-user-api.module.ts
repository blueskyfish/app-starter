/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfiguration, ServerConfigurationParams } from './server-configuration';

import { UserApiService } from './services/user-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserApiService,
    ServerConfiguration
  ],
})
export class FrontendUserApiModule {
  static forRoot(params: ServerConfigurationParams): ModuleWithProviders<FrontendUserApiModule> {
    return {
      ngModule: FrontendUserApiModule,
      providers: [
        {
          provide: ServerConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: FrontendUserApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('FrontendUserApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
