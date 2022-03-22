import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { WeatherForcastingRoutingModule } from './weather-forcasting.routing.module';
import { WeatherService } from '../shared/providers/weather.service';
import { WeatherForcastingComponent } from './weather-forcasting.component';
import { weatherEffect } from '../store/effects';
import { weatherReducers } from '../store/reducers';
import { weatherFeatureKey } from '../store/reducers/weather.reducer';

@NgModule({
	declarations: [WeatherForcastingComponent],
	imports: [
		CommonModule,
		WeatherForcastingRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forFeature(weatherFeatureKey, weatherReducers),
		EffectsModule.forFeature(weatherEffect),
	],
	providers: [WeatherService],
})
export class WeatherForcastingModule {}
