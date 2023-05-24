import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TripsService } from './trips.service';
import { Trips } from '../shared/interfaces';

describe('TripsService', () => {
  let service: TripsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripsService]
    });
    service = TestBed.inject(TripsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve trips', () => {
    const mockTrips: Trips[] = [];
    const limit = '10';
    const offset = '0';

    service.getTrips(limit, offset).subscribe((trips: Trips[]) => {
      expect(trips).toEqual(mockTrips);
    });

    const req = httpMock.expectOne(`${service.url}?limit=${limit}&offset=${offset}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrips);
  });

  it('should retrieve departure count', () => {
    const mockCount = 5;
    const stationName = 'Hanasaari';

    service.getDepartureCount(stationName).subscribe((count: number) => {
      expect(count).toEqual(mockCount);
    });

    const req = httpMock.expectOne(`http://localhost:3000/getBikeDepartures?stationName=${stationName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCount);
  });

  it('should retrieve return count', () => {
    const mockCount = 3;
    const stationName = 'Hanasaari';

    service.getReturnCount(stationName).subscribe((count: number) => {
      expect(count).toEqual(mockCount);
    });

    const req = httpMock.expectOne(`http://localhost:3000/getBikeReturns?stationName=${stationName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCount);
  });
});
