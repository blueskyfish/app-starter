import { StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const devConfig: StoreDevtoolsOptions | undefined = environment.production ? undefined : {
  name: 'AppStarter',
  logOnly: true,
  maxAge: 50,
};
