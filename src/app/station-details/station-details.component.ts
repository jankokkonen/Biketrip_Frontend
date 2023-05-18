import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor (
    private tripsService: TripsService,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.getDepartureCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['station'] && !changes['station'].firstChange) {
      this.getDepartureCount();
    }
  }

  getDepartureCount(): void {
    if (this.station) {
      // console.log(this.station['name'])
      this.tripsService.getDepartureCount(this.station['name'])
        .subscribe((count: any) => {
          this.departureCount = count[0].count;
          console.log(this.departureCount);
      })
    }
  }
}
