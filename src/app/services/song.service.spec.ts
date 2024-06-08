import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongService } from './song.service';
import { Song } from '../models/song.model';
import { HOST } from '../../constants';
import { AppEndpoints } from '../app.endpoints';

describe('SongService', () => {
  let service: SongService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService]
    });

    service = TestBed.inject(SongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve songs from the API via GET', () => {
    const dummySongs: Song[] = [
      { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 },
      { id: 2, title: 'Song 2', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 },
    ];

    service.getSongs().subscribe(songs => {
      expect(songs.length).toBe(2);
      expect(songs).toEqual(dummySongs);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.SONGS}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySongs);
  });

  it('should retrieve a song by ID from the API via GET', () => {
    const dummySong: Song = { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 }

    service.getSongByID('1').subscribe(song => {
      expect(song).toEqual(dummySong);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.SONGS}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySong);
  });

  it('should create a new song via POST', () => {
    const newSong: Song = { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 };

    service.createSong(newSong).subscribe(response => {
      expect(response).toEqual(newSong);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.SONGS}`);
    expect(req.request.method).toBe('POST');
    req.flush(newSong);
  });

  it('should edit a song via PUT', () => {
    const updatedSong: Song = { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 };

    service.editSong('1', updatedSong).subscribe(response => {
      expect(response).toEqual(updatedSong);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.SONGS}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSong);
  });

  it('should delete a song via DELETE', () => {
    const dummySong: Song = { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 };

    service.deleteSong('1').subscribe(response => {
      expect(response).toEqual(dummySong);
    });

    const req = httpMock.expectOne(`${HOST}${AppEndpoints.SONGS}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummySong);
  });
});
