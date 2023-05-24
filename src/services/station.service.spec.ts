import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StationsService } from './stations.service';
import { Stations } from 'src/shared/interfaces';

describe('StationsService', () => {
  let service: StationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StationsService]
    });
    service = TestBed.inject(StationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve stations', () => {
    const mockStations: Stations[] = [];
    const limit = '10';
    const offset = '0';

    service.getStations(limit, offset).subscribe((stations: Stations[]) => {
      expect(stations).toEqual(mockStations);
    });

    const req = httpMock.expectOne(`${service.url}?limit=${limit}&offset=${offset}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStations);
  });
});
