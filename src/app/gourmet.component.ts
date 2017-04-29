import { Component, OnInit, Input } from '@angular/core';

import { GourmetGenre } from './gourmetGenre';
import { GourmetService } from './gourmet.service';

@Component({
  selector: 'gourmet',
  templateUrl: './gourmet.component.html',
  styleUrls: [ './gourmet.component.css' ]
})
export class GourmetComponent implements OnInit {
  genres: Promise<GourmetGenre[]>;  // ホットペッパー ジャンル一覧

  constructor(private gourmetService: GourmetService) { }

  ngOnInit(): void {
    this.genres = this.gourmetService.getGenres();
    //this.gourmetService.getShops(36.55883, 139.898183);
  }
}