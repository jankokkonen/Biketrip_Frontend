import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Stations } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private url = 'http://localhost:3000/getStations';

  constructor(private http: HttpClient) { }

  getStations(): Observable<Stations[]> {
    return this.http.get<Stations[]>(this.url);
  }
}
