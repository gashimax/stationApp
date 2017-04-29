import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';       // Subject は Observable であり、Observer でもある

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators（使用するオペレータは逐一 import すること）
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Station } from './station';
import { StationService } from './station.service';

@Component({
  selector: 'station',
  templateUrl: './station.component.html',
  styleUrls: [ './station.component.css' ],
  providers: [StationService]
})
export class StationComponent implements OnInit {
  stations: Observable<Station[]>;
  selectedStation: Promise<Station>;
  station: Station;
  lat: string;  // 緯度（度）
  lon: string;  // 経度（度）
  private searchTerms = new Subject<string>();

  constructor(private stationService: StationService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.stations = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.stationService.getStations(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Station[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Station[]>([]);
      });

    //console.dir(this.stations);
  }

  onSelect(station: Station): void {
    this.selectedStation = Observable.of(station).toPromise();
    this.station = station;
    this.lat = station.latitude.split(".")[0]; 
    this.lon = station.longitude.split(".")[0];
    
    //console.dir(this.selectedStation);
  }
}