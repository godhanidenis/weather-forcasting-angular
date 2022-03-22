import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
	GetWeathersBegin = '[GetWeathers service] Load data begin',
	GetWeathersSuccess = '[GetWeathers service] Load data success',
	GetWeathersFailure = '[GetWeathers service] Load data failure',
	GetHourlyBegin = '[GetHourly service] Load data begin',
	GetHourlySuccess = '[GetHourly service] Load data success',
	GetHourlyFailure = '[GetHourly service] Load data failure',
	GetDailyBegin = '[GetDaily service] Load data begin',
	GetDailySuccess = '[GetDaily service] Load data success',
	GetDailyFailure = '[GetDaily service] Load data failure',
}

export const GetWeathersBegin = createAction(ActionTypes.GetWeathersBegin, props<{ cityName: string }>());

export const GetWeathersSuccess = createAction(ActionTypes.GetWeathersSuccess, props<{ payload?: any }>());

export const GetWeathersFailure = createAction(ActionTypes.GetWeathersFailure, props<{ payload?: any }>());

export const GetHourlyBegin = createAction(ActionTypes.GetHourlyBegin, props<{ lat?: number; lon?: number }>());

export const GetHourlySuccess = createAction(ActionTypes.GetHourlySuccess, props<{ payload?: any }>());

export const GetHourlyFailure = createAction(ActionTypes.GetHourlyFailure, props<{ payload?: any }>());

export const GetDailyBegin = createAction(ActionTypes.GetDailyBegin, props<{ lat?: number; lon?: number }>());

export const GetDailySuccess = createAction(ActionTypes.GetDailySuccess, props<{ payload?: any }>());

export const GetDailyFailure = createAction(ActionTypes.GetDailyFailure, props<{ payload?: any }>());
