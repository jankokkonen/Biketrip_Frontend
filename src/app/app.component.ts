import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biketrip_frontend';
  showTripsComponent = false;
  showStationsComponent = true;
  selectedButton: string = 'stations';

  showStations() {
    this.selectedButton = 'stations';
    this.showTripsComponent = false;
    this.showStationsComponent = true;
  }

  showTrips() {
    this.selectedButton = 'trips';
    this.showTripsComponent = true;
    this.showStationsComponent = false;
  }
  
}
