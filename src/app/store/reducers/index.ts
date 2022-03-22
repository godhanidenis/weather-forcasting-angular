import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromWeather from './weather.reducer';

export interface WeatherAppState {
  weather: fromWeather.WeatherState;
  hourly: fromWeather.HourlyState;
  daily: fromWeather.DailyState;
}

export const weatherReducers: ActionReducerMap<WeatherAppState> = {
  weather: fromWeather.weatherReducer,
  hourly: fromWeather.hourlyReducer,
  daily: fromWeather.dailyReducer,
};

export const wetherState = createFeatureSelector<WeatherAppState>(
  fromWeather.weatherFeatureKey
);

export const createWeatherData = createSelector(
  wetherState,
  (state: WeatherAppState) => state.weather
);

export const createHourlyData = createSelector(
  wetherState,
  (state: WeatherAppState) => state.hourly
);

export const createDailyData = createSelector(
  wetherState,
  (state: WeatherAppState) => state.daily
);
