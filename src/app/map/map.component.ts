import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

import { StationsService } from 'src/services/stations.service';
import { Stations } from 'src/shared/interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: true }) 
  mapContainer!: ElementRef;
  private map!: L.Map;

  constructor(private stationsService: StationsService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.getAndDisplayStations();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([60.1699, 24.9384], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  private getAndDisplayStations(): void {
    this.stationsService.getStations('500', '0').subscribe((stations: Stations[]) => {
      stations.forEach((station: Stations) => {
        const marker = L.marker([station.x, station.y]).addTo(this.map);
        // console.log(station.x)
        marker.bindPopup(station.name);
      });
    });
  }
  
}
