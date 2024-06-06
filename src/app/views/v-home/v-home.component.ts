import { Component } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-v-home',
  templateUrl: './v-home.component.html',
  styleUrl: './v-home.component.scss'
})
export class VHomeComponent {

  constructor(private songService: SongService) { }

  songs!: Song[];

  ngOnInit(): void {
    this.getSongs()
  }

  getSongs() {
    this.songService.getSongs().subscribe((data) => {
      this.songs=data
  });
  
  }


}
