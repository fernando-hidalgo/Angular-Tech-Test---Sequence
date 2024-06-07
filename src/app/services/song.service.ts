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

  public createSong(song: any) {
    return this.httpClient.post(`${HOST}${AppEndpoints.SONGS}`, song);
  }
}
