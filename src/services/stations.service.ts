import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Stations } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private url = 'http://localhost:3000/getStations';

  constructor(
    private http: HttpClient
    ) { }

  getStations(limit: string, offset: string): Observable<Stations[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
  
    return this.http.get<Stations[]>(`${this.url}`, { params });
  }

  getStationsSearch(searchText: string): Observable<Stations[]> {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get<Stations[]>('http://localhost:3000/getStationsBySearch', {params});
  }

}
