import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user.effects';
import { userFeatureKey, userReducer } from './user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class FrontendUserStoreModule {}
