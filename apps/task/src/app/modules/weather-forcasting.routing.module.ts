import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForcastingComponent } from './weather-forcasting.component';

const routes: Routes = [
	{
		path: '',
		component: WeatherForcastingComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class WeatherForcastingRoutingModule {}
