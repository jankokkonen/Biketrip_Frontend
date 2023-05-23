import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { catchError, throwError, Subject, of, fromEvent } from 'rxjs';
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
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

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
    this.fetchStations();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(() => {
        const searchTerm = this.searchText?.toLowerCase() ?? '';
        if (searchTerm.length >= 3) {
          return this.stationsService.getStationsSearch(searchTerm);
        } else {
          return of([]);
        }
      })
    ).subscribe((stations: Stations[]) => {
      this.stationsSearch = stations;
    });
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
