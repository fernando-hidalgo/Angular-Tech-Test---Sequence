import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';
import { Navigation, URLParams } from '../../../constants';

@Component({
  selector: 'app-v-song-details',
  templateUrl: './v-song-details.component.html',
  styleUrl: './v-song-details.component.scss'
})
export class VSongDetailsComponent {
  songId: string = "";
  song: Song | undefined
  artist: Artist | undefined

  constructor(private route: ActivatedRoute, private songService: SongService, private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => { 
    this.route.paramMap.subscribe(params => {
      //Get songId from URL
      this.songId = params.get(URLParams.songId) ?? '';

      //Using said ID, get specific data for that song
      this.songService.getSongByID(this.songId)?.subscribe ( song => {
        this.song = song

        //Get artist of that song, using its ID in the song object
        this.artistService.getArtistByID(song.artist)?.subscribe(artist => {
          this.artist = artist
        })
      })
    })
    ;}, 1000); // Simulating a delay of 1 seconds, as requested
  };

  deleteSong(){
    this.songService.deleteSong(this.songId).subscribe(() => {
      this.router.navigate([Navigation.BASE])
    })
  }

  editSong(){
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl, Navigation.EDIT]);
  }

}
