import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

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
    this.route.paramMap.subscribe(params => {
      this.songId = params.get('songId') ?? ''; // Si params.get('songId') es null, se asigna una cadena vacía

      this.songService.getSongByID(this.songId)?.subscribe ( song => {
        this.song = song

        this.artistService.getArtistByID(song.artist)?.subscribe(artist => {
          this.artist = artist
        })
         
      }
    )});
  };

  deleteSong(){
    this.songService.deleteSong(this.songId).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  editSong(){
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl + '/edit']);
  }
}
