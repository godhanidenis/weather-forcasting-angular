import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherForcastingComponent } from './weather-forcasting.component';

describe('WeatherForcastingComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [WeatherForcastingComponent],
		}).compileComponents();
	});
});
