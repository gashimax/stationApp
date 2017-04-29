export class Station {
  code: string;           // 駅コード
  name: string;           // 駅名
  yomi: string;           // 駅名読み仮名
  prefectureCode: string; // 県コード
  prefectureName: string; // 県名
  latitude: string;       // 緯度（度.分.秒.100分の1秒）
  longitude: string;      // 経度（度.分.秒.100分の1秒）
  latitude_d: number;     // 緯度（度.分以下）
  longitude_d: number;    // 経度（度.分以下）
}