import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biketrip_frontend';
  selectedButton: 'stations' | 'trips' = 'stations';

  showStations() {
    this.selectedButton = 'stations';
  }

  showTrips() {
    this.selectedButton = 'trips';
  }
}
