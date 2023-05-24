import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router'

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
  markers:L.Marker[] = []
  public selectedMarker?: L.Marker;
  selectedStation?: Stations;

  constructor(
    private stationsService: StationsService,
    private router: Router,
    ){}

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
          iconAnchor: [11, 42],
          popupAnchor: [0, -40]
        });
  
        const marker = L.marker([
          station.y, 
          station.x
        ], { icon }).addTo(this.map);

        const popupContent =
        `
          <div>
            <span>
              ${ station.nimi }, ${ station.kapasiteetti } bikes
            </span>
          </div>
        `;

        const popup = L.popup({
          closeButton: true
        }).setContent(popupContent);

        marker.bindPopup(popup);

        marker.on('click', () => {
          this.setSelectedMarker(marker);
          this.openStationDetails(station);
        });
  
        marker.on('mouseover', () => {
          if (!this.selectedMarker || this.selectedMarker !== marker) {
            marker.openPopup();
          }
        });
        
        marker.on('mouseout', () => {
          if (!this.selectedMarker || this.selectedMarker !== marker) {
            marker.closePopup();
          }
        });
      });
    });
  }

  openStationDetails(station: Stations) {
      this.router.navigate(['/']);
      setTimeout(() => {
        this.selectedStation = station;
        this.router.navigate(['/station-details', station.station_id], { state: { station } });
      }, .1);
  }

  private setSelectedMarker(marker: L.Marker): void {
    if (this.selectedMarker === marker) {
      marker.closePopup();
      this.selectedMarker = undefined;
    } else {
      if (this.selectedMarker) {
        this.selectedMarker.closePopup();
      }
      this.selectedMarker = marker;
      marker.openPopup();
      this.map.setView(marker.getLatLng(), this.map.getZoom());
    }
  }
}  
