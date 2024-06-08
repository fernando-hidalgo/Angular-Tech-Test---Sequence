import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArtistService } from './artist.service';
import { Artist } from '../models/artist.model';
import { HOST } from '../../constants';
import { AppEndpoints } from '../app.endpoints';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService]
    });

    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all artists from the API via GET', () => {
    const dummyArtists: Artist[] = [
      { id: 1, name: 'Artist 1',birthdate:"1990",bornCity:"Chicago",img:"URL",rating:10,songs:[1,2] },
      { id: 2, name: 'Artist 2',birthdate:"1990",bornCity:"Chicago",img:"URL",rating:10,songs:[1,2] }
    ];

    service.getAllArtist().subscribe(artists => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(dummyArtists);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.ARTISTS}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArtists);
  });

  it('should retrieve an artist by ID from the API via GET', () => {
    const dummyArtist: Artist = { id: 1, name: 'Artist 1',birthdate:"1990",bornCity:"Chicago",img:"URL",rating:10,songs:[1,2] };

    service.getArtistByID(1).subscribe(artist => {
      expect(artist).toEqual(dummyArtist);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.ARTISTS}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArtist);
  });
});