import { Injectable } from '@angular/core';
import { Jsonp, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { GourmetGenre } from './gourmetGenre';
import { AppConfig } from './app.config'; // 設定ファイル（APIキーなど）

@Injectable()
export class GourmetService {
  genres: GourmetGenre[];  // ホットペッパー ジャンル一覧
  
  // ホットペッパーAPI
  // ex) http://webservice.recruit.co.jp/hotpepper/genre/v1/
  //        ?key=[API_KEY]&format=jsonp&callback=JSONP_CALLBACK（ジャンル一覧取得）
  //     http://webservice.recruit.co.jp/hotpepper/gourmet/v1/
  //        ?key=[API_KEY]&format=jsonp&callback=JSONP_CALLBACK
  //        &lat=36.55883&lng=139.898183&range=5&order=4（宇都宮駅, 2Km, オススメ順）
  //
  private apiUrlHead = "http://webservice.recruit.co.jp/hotpepper"; // ホットペッパーAPIの先頭部分
  private apiKey = AppConfig.HOTPEPPER_API_KEY;
  private format = "jsonp";
  private callbackName= "JSONP_CALLBACK";
  
  constructor(private jsonp: Jsonp) {
    //this.getGenres().then(value => this.genres = value);
    //this.getGenres().then(value => this.setGenres(value));
  }
  /*
  setGenres(value: GourmetGenre[]) {
    this.genres = value;
    console.dir(Date.now().toString() +" "+ this.genres);
  }
  */
  
  // ジャンル一覧取得
  getGenres(): Promise<GourmetGenre[]> {
    // URLパラメタオブジェクト作成
    let params = new URLSearchParams();
    params.set("key", this.apiKey);
    params.set("format", this.format);
    params.set("callback", this.callbackName);

    return this.jsonp.get(this.apiUrlHead +"/genre/v1/?"+ params.toString())
      .toPromise()
      .then(response => response.json().results.genre as GourmetGenre[])
      .catch(this.handleError);
  }

  // 店舗一覧取得 by 緯度・経度
  getShops(lat: number, lng:number): Observable<any> {
    // URLパラメタオブジェクト作成
    let params = new URLSearchParams();
    params.set("key", this.apiKey);
    params.set("format", this.format);
    params.set("callback", this.callbackName);
    params.set("lat", lat.toString());
    params.set("lng", lng.toString());
    params.set("range", "5");
    params.set("order", "4");

    console.log("GorumetService.getShops()");

    return this.jsonp.get(this.apiUrlHead +"/gourmet/v1/?"+ params.toString())
      .map((response) => {
        let shopData;
        let obj = response.json();
        if (obj.results.error) {
          //Web APIリクエスト失敗
          let err = obj.results.error[0];
          shopData = {
            error: err.code,
            message: err.message
          }
        } else {
          //Web APIリクエスト成功
          let dataObj = obj.results.shop;
          shopData = {
            error: null,
            data: dataObj,
          };
        }
        console.dir(shopData);
        return shopData;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

