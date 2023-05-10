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
}
