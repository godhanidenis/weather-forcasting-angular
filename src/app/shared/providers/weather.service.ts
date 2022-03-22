import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = ' http://api.openweathermap.org/';
  Key = '892ba8063d359db78d319e0493910d97';
  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string) {
    const apiKey = this.Key;
    return this.http.get(this.url + `geo/1.0/direct`, {
      params: { q: cityName, limit: 1, appid: apiKey },
    });
  }

  getHourlyMode(lat: any, lon: any) {
    const apiKey = this.Key;
    return this.http.get(this.url + `data/2.5/onecall?`, {
      params: {
        lat: lat,
        lon: lon,
        exclude: 'current, minutely, daily, alerts',
        appid: apiKey,
      },
    });
  }

  getDailyMode(lat: any, lon: any) {
    const apiKey = this.Key;
    return this.http.get(this.url + `data/2.5/onecall?`, {
      params: {
        lat: lat,
        lon: lon,
        exclude: 'current,minutely,hourly',
        appid: apiKey,
      },
    });
  }
}
