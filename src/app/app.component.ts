import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WeatherService } from './shared/providers/weather.service';
import { chunkArrayInGroups } from './shared/utils/utils';
import {
  GetDailyBegin,
  GetHourlyBegin,
  GetWeathersBegin,
} from './store/actions/weather.action';
import {
  createDailyData,
  createHourlyData,
  createWeatherData,
  WeatherAppState,
} from './store/reducers';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param['city'] && param['mode']) {
        this.weatherForm.patchValue({
          city: param['city'],
          mode: param['mode'],
        });
        if (!this.weatherForm.invalid) {
          this.store.dispatch(
            GetWeathersBegin({ cityName: this.weatherForm.value.city })
          );
        }
      }
    });
    this.store.select(createWeatherData).subscribe(
      (res) => {
        if (!res.loading && res.data.length > 0) {
          let lat = res.data[0].lat;
          let lon = res.data[0].lon;
          this.weatherForm.value.mode === 'hourly'
            ? this.store.dispatch(GetHourlyBegin({ lat, lon }))
            : this.store.dispatch(GetDailyBegin({ lat, lon }));
        }
      },
      (error) => {
        console.log('createWeatherData Error: ', error);
      }
    );

    this.store.select(createHourlyData).subscribe(
      (res) => {
        if (!res.loading && res.data.length > 0) {
          this.hourlyData = res.data.slice(0, 24);
          this.hourlyGroupedData = chunkArrayInGroups(res.data.slice(0, 24), 3);
        }
      },
      (error) => {
        console.log('createHourlyData Error: ', error);
      }
    );

    this.store.select(createDailyData).subscribe(
      (res) => {
        if (!res.loading && res.data.length > 0) {
          this.dailyData = res.data;
        }
      },
      (error) => {
        console.log('createDailyData Error: ', error);
      }
    );
  }

  selectMode() {
    let data = this.weatherForm.value;
    this.location.replaceState(`/?city=${data.city}&mode=${data.mode}`);
    this.store.dispatch(GetWeathersBegin({ cityName: data.city }));
  }
}
