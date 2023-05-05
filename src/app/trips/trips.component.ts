import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trips } from '../../shared/interfaces'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips?: Trips[] = [];

  constructor (private http: HttpClient) 
  {}

  ngOnInit(): void {
    
  }
}
