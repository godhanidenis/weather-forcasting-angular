import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { chunkArrayInGroups } from '../shared/utils/utils';
import { GetWeathersBegin, GetHourlyBegin, GetDailyBegin } from '../store/actions/weather.action';
import { WeatherAppState, createWeatherData, createHourlyData, createDailyData } from '../store/reducers';

@Component({
	selector: 'app-weather-forcasting',
	templateUrl: './weather-forcasting.component.html',
	styleUrls: ['./weather-forcasting.component.scss'],
})
export class WeatherForcastingComponent implements OnInit {
	title = 'weather';
	weatherForm!: FormGroup;
	dailyData: any[] = [];
	hourlyData: any[] = [];
	hourlyGroupedData: any[] = [];

	constructor(
		private store: Store<WeatherAppState>,
		private location: Location,
		private activatedRoute: ActivatedRoute
	) {
		this.weatherForm = new FormGroup({
			city: new FormControl('', [Validators.required]),
			mode: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(param => {
			if (param['city'] && param['mode']) {
				this.weatherForm.patchValue({ city: param['city'], mode: param['mode'] });

				if (!this.weatherForm.invalid) {
					this.store.dispatch(GetWeathersBegin({ cityName: this.weatherForm.value.city }));
				}
			}
		});
		this.store.select(createWeatherData).subscribe(
			(res: any) => {
				if (!res.loading && res.data.length > 0) {
					const lat = res.data[0].lat;
					const lon = res.data[0].lon;
					this.weatherForm.value.mode === 'hourly'
						? this.store.dispatch(GetHourlyBegin({ lat, lon }))
						: this.store.dispatch(GetDailyBegin({ lat, lon }));
				}
			},
			(error: any) => {
				console.log('createWeatherData Error: ', error);
			}
		);

		this.store.select(createHourlyData).subscribe(
			(res: any) => {
				if (!res.loading && res.data.length > 0) {
					console.log('createHourlyData res :', res);
					this.hourlyData = res.data.slice(0, 24);
					this.hourlyGroupedData = chunkArrayInGroups(res.data.slice(0, 24), 3);
					console.log('this.hourlyGroupedData :', this.hourlyGroupedData);
				}
			},
			(error: any) => {
				console.log('createHourlyData Error: ', error);
			}
		);

		this.store.select(createDailyData).subscribe(
			(res: any) => {
				if (!res.loading && res.data.length > 0) {
					console.log('createDailyData res :', res);
					this.dailyData = res.data;
					console.log('this.dailyData :', this.dailyData);
				}
			},
			(error: any) => {
				console.log('createDailyData Error: ', error);
			}
		);
	}

	selectMode() {
		console.log('selectMode Executed!!');
		const data = this.weatherForm.value;
		this.location.replaceState(`/weather-forcasting/?city=${data.city}&mode=${data.mode}`);
		this.store.dispatch(GetWeathersBegin({ cityName: data.city }));
	}
}
