import { Component, ViewChild } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import {MatSidenav} from '@angular/material/sidenav';
@Component({
  selector: 'app-v-home',
  templateUrl: './v-home.component.html',
  styleUrl: './v-home.component.scss',
})
export class VHomeComponent {

  constructor(private songService: SongService) { }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  songs!: Song[];
  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  ngOnInit(): void {
    this.getSongs()
  }

  getSongs() {
    this.songService.getSongs().subscribe((data: Song[]) => {
      this.songs=data
  });
  }


}
