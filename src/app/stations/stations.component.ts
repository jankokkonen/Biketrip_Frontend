import { Component, OnInit } from '@angular/core';
import { catchError, throwError, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { StationsService } from 'src/services/stations.service';

import { Stations } from 'src/shared/interfaces';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  selectedStationIndex?: number;
  selectedHeader?: string;
  stations?: Stations[] = [];
  stationsSearch?: Stations[] = [];
  searchText?: string = '';
  selectedStation?: Stations;

  currentPage = 1;
  totalStations = 0;
  stationsPerPage = 18;

  constructor (
    private stationsService: StationsService,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.searchTerm.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          if (this.searchText !== undefined) {
            console.log(this.searchText)
            return this.stationsService.getStationsSearch(this.searchText);
          } else {
            return of([]); // Tyhjä tulos, jos searchText on undefined
          }
        })
      ).subscribe((stations: Stations[]) => {
        this.stationsSearch = stations;
        console.log(this.stationsSearch)
      });
      this.fetchStations();
    }

  private searchTerm = new Subject<string>();
  
  searchStations(): void {
    if (this.searchText !== undefined) {
      this.searchTerm.next(this.searchText);
    }
  }

  selectStation(index: number): void {
    this.selectedStationIndex = index;
  }

  selectHeader(header: string): void {
    this.selectedHeader = header;
  }

  fetchStations() {
    const params = {
      limit: this.stationsPerPage.toString(),
      offset:((this.currentPage - 1) * this.stationsPerPage).toString()
    }

    this.stationsService.getStations(params.limit, params.offset)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      ).subscribe(response => {
        this.stations = response.map(station => {
          return {
            ...station
          }
        })
        this.totalStations = response.length;
      });
  }

  openStationDetails(station: Stations) {
      this.selectedStation = station;
      this.router.navigate(['/station-details', station.station_id], { state: { station } });
  }

  loadNextStations() {
    this.currentPage++;
    this.fetchStations();
    this.selectedStation = undefined;
  }

  loadPreviousStations() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchStations();
      this.selectedStation = undefined;
    }
  }
}
