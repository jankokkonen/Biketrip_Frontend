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
  public map!: L.Map;
  markers:L.Marker<any> [] = []

  constructor(private stationsService: StationsService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addTestMarker();
    this.addTestMarker2();
    this.getAndDisplayStations();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([60.1699, 24.9384], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  private addTestMarker(): void {
    const marker = L.marker([60.1699, 24.9384]).addTo(this.map);
    marker.bindPopup('Test Marker');
  }

  private addTestMarker2(): void {
    const marker = L.marker([24.8989998259643, 60.2444085812279]).addTo(this.map);
    marker.bindPopup('Test Marker');
  }

  private getAndDisplayStations(): void {
    this.stationsService.getStations('500', '0').subscribe((stations: Stations[]) => {
      stations.forEach((station: Stations) => {
        const icon = L.icon({
          iconUrl: `../../assets/img/bicycle.png`,
          iconSize: [25, 25], // size of the icon
          iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
        });
  
        const marker = L.marker([station.y, station.x],{ icon }).addTo(this.map);
        marker.bindPopup(station.name);
      })
      
    });
  }
  
}
