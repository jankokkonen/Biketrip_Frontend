import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { StationsComponent } from './stations/stations.component';
import { MapComponent } from './map/map.component';
import { StationDetailsComponent } from './station-details/station-details.component';

const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'station-details/:id', component: StationDetailsComponent },
  { path: '', redirectTo: '/stations', pathMatch: 'full' }
];

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
    HttpClientModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
3