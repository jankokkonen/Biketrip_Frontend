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
          `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${('0' + date.getHours()).slice(-2)}.${('0' + date.getMinutes()).slice(-2)}`;

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

  loadNextTrips() {
    this.currentPage++;
    this.fetchTrips();
  }

  loadPreviousTrips() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTrips();
    }
  }

}
