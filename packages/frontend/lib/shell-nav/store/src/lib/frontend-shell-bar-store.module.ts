import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ShellBarConfig, ShellBarConfigService } from './shell-bar.config';
import { shellBarReducer, shellBarFeatureKey } from './shell-bar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ShellBarEffects } from './shell-bar.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(shellBarFeatureKey, shellBarReducer),
    EffectsModule.forFeature([ShellBarEffects]),
  ],
})
export class FrontendShellBarStoreModule {

  static forRoot(config: ShellBarConfig): ModuleWithProviders<FrontendShellBarStoreModule> {
    return {
      ngModule: FrontendShellBarStoreModule,
      providers: [
        {
          provide: ShellBarConfigService,
          useValue: new ShellBarConfigService(config.actionUrl),
        }
      ]
    };
  }
}
