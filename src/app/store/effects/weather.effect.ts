import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/shared/providers/weather.service';
import {
  GetWeathersBegin,
  GetWeathersFailure,
  GetWeathersSuccess,
  GetHourlyBegin,
  GetHourlySuccess,
  GetHourlyFailure,
  GetDailyBegin,
  GetDailyFailure,
  GetDailySuccess,
} from '../actions/weather.action';

@Injectable()
export class WeatherEffect {
  constructor(
    private actions$: Actions,
    private wetherService: WeatherService
  ) {}

  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetWeathersBegin),
      switchMap((action) =>
        this.wetherService.getWeatherData(action.cityName).pipe(
          switchMap(this.handleMakeWeatherResp),
          catchError((error) => {
            return [GetWeathersFailure({ payload: error })];
          })
        )
      )
    )
  );

  getHourly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetHourlyBegin),
      switchMap((action) =>
        this.wetherService.getHourlyMode(action.lat, action.lon).pipe(
          switchMap(this.handleMakeHourlyResp),
          catchError((error) => {
            return [GetHourlyFailure({ payload: error })];
          })
        )
      )
    )
  );

  getDaily$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDailyBegin),
      switchMap((action) =>
        this.wetherService.getDailyMode(action.lat, action.lon).pipe(
          switchMap(this.handleMakeDailyResp),
          catchError((error) => {
            return [GetDailyFailure({ payload: error })];
          })
        )
      )
    )
  );

  handleMakeWeatherResp = (result: any) => {
    return [GetWeathersSuccess({ payload: result })];
  };

  handleMakeHourlyResp = (result: any) => {
    return [GetHourlySuccess({ payload: result.hourly })];
  };

  handleMakeDailyResp = (result: any) => {
    return [GetDailySuccess({ payload: result.daily })];
  };
}
