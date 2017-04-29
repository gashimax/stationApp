import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, Jsonp, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { Station } from './station';
import { AppConfig } from './app.config'; // 設定ファイル（APIキーなど）

@Injectable()
export class StationService {

  // 駅すぱあと API
  //
  //  ※ JSONP非対応！！　=> なので、examind.net 上に JSONP にラッピングするPHPスクリプトを置き、それを経由してアクセス
  //
  // ex) http://api.ekispert.jp//v1/json/station?key=[API_KEY]&gcs=wgs84&name=%E5%AE%87%E9%83%BD%E5%AE%AE　（宇都宮、2件）
  // ex) http://api.ekispert.jp//v1/json/station?key=[API_KEY]&gcs=wgs84&code=21736　（宇都宮）
  //
  //private headers = new Headers({'Content-Type': 'application/json'});
  private proxyUrl = "http://examind.net/app/ba-simple-proxy.php";
  private apiUrl = "http://api.ekispert.jp/v1/json/station";
  private apiKey = AppConfig.STATION_API_KEY;
  private apiGCS = "wgs84"; // APIコール時に指定する測地系（WGS84）
  private apiLimit = "100";  // 最大取得件数（default: 100）
  private callbackName= "JSONP_CALLBACK";
  
  //constructor(private http: Http) { }
  constructor(private jsonp: Jsonp) { }

  getStations(name: string): Observable<Station[]> {
    let stations: Station[] = [];
    
    // URLパラメタオブジェクト作成
    let params = new URLSearchParams();
    params.set("key", this.apiKey);
    params.set("name", name);
    params.set("gcs", this.apiGCS);
    params.set("limit", this.apiLimit);
    params.set("callback", this.callbackName);

    //this.jsonp.get(this.apiUrl +"?"+ params.toString())
    this.jsonp.get(this.proxyUrl +"?url="+ this.apiUrl +"?"+ params.toString()) // API Proxy 利用
      .subscribe((res: Response) => {
          //let points = res.json().ResultSet.Point;  
          let points = res.json().contents.ResultSet.Point; // API Proxy利用
          //console.dir(points);          
          for (var i = 0; i < points.length-1; i++) {
            let station = new Station();
            station.code = points[i].Station.code;
            station.name = points[i].Station.Name;
            station.yomi = points[i].Station.Yomi;
            station.prefectureCode = points[i].Prefecture.code;
            station.prefectureName = points[i].Prefecture.Name;
            station.latitude = points[i].GeoPoint.lati;
            station.longitude = points[i].GeoPoint.longi;
            station.latitude_d = points[i].GeoPoint.lati_d;
            station.longitude_d = points[i].GeoPoint.longi_d;
            stations.push(station);
          }
      });

    //console.dir(stations);
    return Observable.of<Station[]>(stations);
  }

  getStation(code: string): Station {
    let station = new Station();

    // URLパラメタオブジェクト作成
    let params = new URLSearchParams();
    params.set("key", this.apiKey);
    params.set("code", code);
    params.set("gcs", this.apiGCS);
    params.set("limit", this.apiLimit);
    params.set("callback", this.callbackName);

    //this.jsonp.get(this.apiUrl +"?"+ params.toString())
    this.jsonp.get(this.proxyUrl +"?url="+ this.apiUrl +"?"+ params.toString()) // API Proxy 利用
      .subscribe((res: Response) => {
          //let tmp = res.json().ResultSet.Point[0];
          let tmp = res.json().contents.ResultSet.Point[0]; // API Proxy 利用
          station.code = tmp.Station.code;
          station.name = tmp.Station.Name;
          station.yomi = tmp.Station.Yomi;
          station.prefectureCode = tmp.Prefecture.code;
          station.prefectureName = tmp.Prefecture.Name;
          station.latitude = tmp.GeoPoint.lati;
          station.longitude = tmp.GeoPoint.longi;
          station.latitude_d = tmp.GeoPoint.lati_d;
          station.longitude_d = tmp.GeoPoint.longi_d;
      });
    
    //console.dir(station);
    return station;
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}