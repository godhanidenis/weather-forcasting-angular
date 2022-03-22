import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class WeatherService {
	url = ' http://api.openweathermap.org/';
	key = '892ba8063d359db78d319e0493910d97';

	constructor(private http: HttpClient) {}

	getWeatherData(cityName: string) {
		return this.http.get(this.url + `geo/1.0/direct`, {
			params: { q: cityName, limit: 1, appid: this.key },
		});
	}

	getHourlyMode(lat: number, lon: number) {
		return this.http.get(this.url + `data/2.5/onecall?`, {
			params: {
				lat: lat,
				lon: lon,
				exclude: 'current, minutely, daily, alerts',
				appid: this.key,
			},
		});
	}

	getDailyMode(lat: number, lon: number) {
		return this.http.get(this.url + `data/2.5/onecall?`, {
			params: {
				lat: lat,
				lon: lon,
				exclude: 'current,minutely,hourly',
				appid: this.key,
			},
		});
	}
}
