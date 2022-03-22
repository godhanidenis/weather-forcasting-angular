import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  weatherFeatureKey,
  weatherReducer,
} from './store/reducers/weather.reducer';
import { weatherReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { weatherEffect } from './store/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(weatherFeatureKey, weatherReducers),
    EffectsModule.forFeature(weatherEffect),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
