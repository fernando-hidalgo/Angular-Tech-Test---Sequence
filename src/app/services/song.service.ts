import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Song } from "../models/song.model";
import { Observable } from "rxjs";
import { HOST } from "../../constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private httpClient: HttpClient) { }

  public getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(`${HOST}${AppEndpoints.SONGS}`);
  }

  public getSongByID(songId: string): Observable<Song> {
    return this.httpClient.get<Song>(`${HOST}${AppEndpoints.SONGS}/` + songId);
  }

  public createSong(song: any) {
    return this.httpClient.post(`${HOST}${AppEndpoints.SONGS}`, song);
  }

  public editSong(songId: string, song: any) {
    return this.httpClient.put(`${HOST}${AppEndpoints.SONGS}/` + songId, song);
  }

  public deleteSong(songId: string): Observable<Song> {
    return this.httpClient.delete<Song>(`${HOST}${AppEndpoints.SONGS}/` + songId);
  }
}
