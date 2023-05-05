import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  tripsPerPage = 10;

  constructor (private http: HttpClient) 
  {}

  ngOnInit(): void {
      this.fetchTrips();
  }

  fetchTrips() {
    const params = {
      limit: this.tripsPerPage.toString(),
      offset:((this.currentPage - 1) * this.tripsPerPage).toString()
    }

    this.http.get<Trips[]>(`${this.url}`, { params })
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        this.trips = response;
        this.totalTrips = response.length;
        console.log(response);
    });
  }

}
