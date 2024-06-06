import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-song-card',
  templateUrl: './c-song-card.component.html',
  styleUrl: './c-song-card.component.scss'
})
export class CSongCardComponent {
    @Input() title!: string
    @Input() poster!: string
    @Input() genre!: Array<string>
    songTitle = "Adore u"
  }
