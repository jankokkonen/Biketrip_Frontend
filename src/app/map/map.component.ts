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
        const icon = L.icon({
          iconUrl: `../../assets/img/bicycle.png`,
          iconSize: [20, 20],
          iconAnchor: [15.5, 42],
          popupAnchor: [0, -40]
        });
  
        const marker = L.marker([
          station.y, 
          station.x
        ], { icon }).addTo(this.map);

        const popup = L.popup({
          closeButton: false
        }).setContent(station.name);

        marker.bindPopup(popup);
        
        marker.on('mouseover', () => {
          marker.openPopup();
        });
  
        marker.on('mouseout', () => {
          marker.closePopup();
        });
      });
    });
  }
}  
