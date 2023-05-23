/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, Input } from '@angular/core';
import { Stations } from 'src/shared/interfaces';
import { TripsService } from 'src/services/trips.service';
@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent implements OnInit {
  @Input() station?: Stations;

  departureCount = 0;
  returnCount = 0;

  constructor (
    private tripsService: TripsService
    ) {}

  ngOnInit(): void {
    this.station = history.state.station;
    this.getDepartureCount();
    this.getReturnCount();
  }

  getDepartureCount(): void {
    if (this.station) {
      this.tripsService.getDepartureCount(this.station['name'])
        .subscribe((count: any) => {
          this.departureCount = count[0].count;
      })
    }
  }

  getReturnCount() {
    if (this.station) {
      this.tripsService.getReturnCount(this.station['name'])
        .subscribe((count: any) => {
          this.returnCount = count[0].count;
      })
    }
  }
}
