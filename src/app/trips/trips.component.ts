import { Component, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Observable, catchError, throwError } from 'rxjs';

import { Trips } from '../../shared/interfaces'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  private url = 'http://localhost:3000/get'

  trips?: Trips[] = [];

  currentPage = 1;
  totalTrips = 0;
  tripsPerPage = 25;

  constructor (private tripsService: TripsService) 
  {}

  ngOnInit(): void {
      this.fetchTrips();
  }

  fetchTrips() {
    const params = {
      limit: this.tripsPerPage.toString(),
      offset:((this.currentPage - 1) * this.tripsPerPage).toString()
    }

    this.tripsService.getTrips(params.limit, params.offset)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.trips = response.map(trip => {
          const date = new Date(trip.bike_departure);
          const formattedDate = 
            `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${date.getHours()}.${date.getMinutes()}`

          const formattedDuration = 
            `${Math.floor(trip.duration_sec / 60)} min ${trip.duration_sec % 60 < 10 ? '0' : ''}${trip.duration_sec % 60} s`;

          return {
            ...trip,
            bike_departure: formattedDate,
            duration: formattedDuration
          };
        })
        this.totalTrips = response.length;
        console.log(response);
    });
  }

}
