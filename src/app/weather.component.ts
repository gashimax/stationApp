import { Component, OnInit, Input } from '@angular/core';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: [ './weather.component.css' ]
})
export class WeatherComponent implements OnInit {
  @Input() lat: number;
  @Input() lon: number;
  weather: Weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //this.viewWeather();
    this.weather = this.weatherService.getWeather(this.lat, this.lon);
  }
}