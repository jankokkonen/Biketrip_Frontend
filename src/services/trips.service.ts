import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trips } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private url = 'http://localhost:3000/getTrips';

  constructor(private http: HttpClient) { }

  getTrips(limit: string, offset: string): Observable<Trips[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
    return this.http.get<Trips[]>(`${this.url}`, { params });
  }

  getDepartureCount(stationName: string): Observable<number> {
    const params = new HttpParams().set('stationName', stationName);
    return this.http.get<number>('http://localhost:3000/getBikeDepartures', {params});
  }

  getReturnCount(stationName: string): Observable<number> {
    const params = new HttpParams().set('stationName', stationName);
    return this.http.get<number>('http://localhost:3000/getBikeReturns', {params});
  }
}
