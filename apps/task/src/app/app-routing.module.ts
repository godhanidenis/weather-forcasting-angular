import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'weather-forcasting',
		loadChildren: () => import('./modules/weather-forcasting.module').then(m => m.WeatherForcastingModule),
	},
	{
		path: '',
		redirectTo: 'weather-forcasting',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
