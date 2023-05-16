import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';
import { StationDetailsComponent } from './station-details/station-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    StationsComponent,
    MapComponent,
    StationDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
