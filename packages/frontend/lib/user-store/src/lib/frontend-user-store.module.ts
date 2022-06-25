import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from './user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
  ]
})
export class FrontendUserStoreModule {}
