import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { GourmetService } from './gourmet.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.css' ],
  providers: [GourmetService]
})
export class MapComponent implements OnInit {
  @Input() latitude_d: number;  // 定義は number だが、typeof() で調べると実は string
  @Input() longitude_d: number; // 定義は number だが、typeof() で調べると実は string
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;
  shops: Observable<any>;  // 周辺のグルメスポット情報

  constructor(private gourmetService: GourmetService) { }

  ngOnInit() {
    // グルメ情報取得（under construction）
    /*
    this.gourmetService.getShops(this.latitude_d, this.longitude_d)
      .subscribe(
          result => this.setShops(result),   //通信成功時の処理
          error => alert("通信エラー\n" + error) //通信失敗時の処理
      );
    console.dir(this.shops);
    */
    //this.shops = this.gourmetService.getShops(this.latitude_d, this.longitude_d);
    //console.dir(this.shops);

    // 宇都宮
    //this.lat = 36.55883;
    //this.lng = 139.898183;
    // 大阪
    //this.lat = 34.701979;
    //this.lng = 135.495134;

    // @input の値を明確に float にして lat, lng にセットする。
    // @input（定義はnumber）の変数をそのまま使うと地図が正常に表示されない！！
    //（angular2-google-maps 側で string扱いされる）
    this.lat = parseFloat(this.latitude_d.toString());
    this.lng = parseFloat(this.longitude_d.toString());
    //console.log(typeof this.lat);
    //console.log(this.lat +" , "+ this.lng);
  }

  // グルメ情報のセット
  setShops(result) {
    //Web APIデータ取得エラー発生時
    if (result.error) {
      alert("Web APIエラー\n" + result.message);
      return;
    }
    //Web APIデータ取得成功時
    this.shops = result.data;
    console.dir(this.shops);
    console.dir(result.data);
  }
}