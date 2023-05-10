import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { StationsService } from 'src/services/stations.service';

import { Stations } from 'src/shared/interfaces';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations?: Stations[] = [];

  constructor (private stationsService: StationsService) 
  {}

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations() {
  this.stationsService.getStations()
    .pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(stations => {
      console.log(stations);
      this.stations = stations;
    });
}
}
