import { createReducer, on } from '@ngrx/store';
import * as formWeather from '../actions/weather.action';

export const weatherFeatureKey = 'weather';

export interface WeatherState {
	data: any[];
	loading: boolean;
	error: any;
}

export const initialWeatherState: WeatherState = {
	data: [],
	loading: false,
	error: null,
};

export const weatherReducer = createReducer(
	initialWeatherState,
	on(formWeather.GetWeathersBegin, state => ({
		...state,
		loading: true,
		error: null,
	})),
	on(formWeather.GetWeathersSuccess, (state, action) => ({
		data: action.payload,
		loading: false,
		error: null,
	})),
	on(formWeather.GetWeathersFailure, (state, action) => ({
		...state,
		loading: false,
		error: action.payload,
	}))
);

export interface HourlyState {
	data: any[];
	loading: boolean;
	error: any;
}

export const initialHourlyState: HourlyState = {
	data: [],
	loading: false,
	error: null,
};

export const hourlyReducer = createReducer(
	initialHourlyState,
	on(formWeather.GetHourlyBegin, state => ({
		...state,
		loading: true,
		error: null,
	})),
	on(formWeather.GetHourlySuccess, (state, action) => ({
		data: action.payload,
		loading: false,
		error: null,
	})),
	on(formWeather.GetHourlyFailure, (state, action) => ({
		...state,
		loading: false,
		error: action.payload,
	}))
);

export interface DailyState {
	data: any[];
	loading: boolean;
	error: any;
}

export const initialDailyState: DailyState = {
	data: [],
	loading: false,
	error: null,
};

export const dailyReducer = createReducer(
	initialDailyState,
	on(formWeather.GetDailyBegin, state => ({
		...state,
		loading: true,
		error: null,
	})),
	on(formWeather.GetDailySuccess, (state, action) => ({
		data: action.payload,
		loading: false,
		error: null,
	})),
	on(formWeather.GetDailyFailure, (state, action) => ({
		...state,
		loading: false,
		error: action.payload,
	}))
);
