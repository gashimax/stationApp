import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from "@angular/http";

import { AppComponent } from './app.component';

// 駅（駅すぱあと）
import { StationComponent } from './station.component';
import { StationService }   from './station.service';
// 天気（OpenWeatherMap）
import { WeatherComponent } from './weather.component';
import { WeatherService }   from './weather.service';
// 地図（GoogleMap）
import { MapComponent }   from './map.component';
import { AgmCoreModule }  from 'angular2-google-maps/core';
// グルメ（ホットペッパー）
import { GourmetComponent } from './gourmet.component';
import { GourmetService } from './gourmet.service';

// 設定ファイル（APIキーなど）
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    StationComponent,
    WeatherComponent,
    MapComponent,
    GourmetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: AppConfig.GOOGLE_MAPS_API_KEY // Google Maps APIキー
    })
  ],
  providers: [
    StationService,
    WeatherService,
    GourmetService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
