import { Injectable } from '@angular/core';
import { Jsonp, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { Weather } from './weather';
import { AppConfig } from './app.config'; // 設定ファイル（APIキーなど）

@Injectable()
export class WeatherService {

  // OpenWeatherMap API (Current weather data)
  // ex) http://api.openweathermap.org/data/2.5/weather?appid=[API_KEY]&lat=35&lon=139
  //
  private apiUrl = "http://api.openweathermap.org/data/2.5/weather";
  private apiKey = AppConfig.OPEN_WEATHER_API_KEY;
  private callbackName= "JSONP_CALLBACK";
  private iconUrl = "http://openweathermap.org/img/w/";
  
  constructor(private jsonp: Jsonp) { }

  getWeather(lat: number, lon: number): Weather {
    // URLパラメタオブジェクト作成
    let params = new URLSearchParams();
    params.set("appid", this.apiKey);
    params.set("lat", lat.toString());
    params.set("lon", lon.toString());
    params.set("callback", this.callbackName);

    let rst = new Weather();
    this.jsonp.get(this.apiUrl +"?"+ params.toString())
      .subscribe((res: Response) => {
          let tmp = res.json();
          rst.text = tmp.weather[0].main;
          rst.icon = this.iconUrl + tmp.weather[0].icon + ".png";
      });
    
    //console.dir(rst);
    return rst;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

