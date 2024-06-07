import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEndpoints } from '../app.endpoints';
import { HOST } from '../../constants';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) { }

  public getAllArtist(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(`${HOST}${AppEndpoints.ARTISTS}`);
  }

  public getArtistByID(artistId: number): Observable<Artist> {
    return this.httpClient.get<Artist>(`${HOST}${AppEndpoints.ARTISTS}/` + artistId);
  }
}
