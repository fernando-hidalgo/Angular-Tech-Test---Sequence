import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-song-card',
  templateUrl: './c-song-card.component.html',
  styleUrl: './c-song-card.component.scss'
})
export class CSongCardComponent {
    @Input() title: string | undefined
    @Input() poster: string | undefined
    @Input() genre: Array<string> | undefined
  }
