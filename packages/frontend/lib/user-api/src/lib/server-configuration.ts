/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ServerConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `FrontendUserApiModule.forRoot()`
 */
export interface ServerConfigurationParams {
  rootUrl?: string;
}
