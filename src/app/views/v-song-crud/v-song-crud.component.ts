import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-v-song-crud',
  templateUrl: './v-song-crud.component.html',
  styleUrl: './v-song-crud.component.scss',
  providers: [ provideMomentDateAdapter(MY_FORMATS), ],
})
export class VSongCrudComponent {
  crudForm!: FormGroup;

  genres: string[] = [];
  genre: string | null = null;

  companies: string[] = [];
  company: string | null = null;

  musicians: any[] = [];
  selectedMusicianId?: number;

  songId: string = "";
  currentUrl: string = ""

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.crudForm = this.fb.group({
      songTitle: ['', {
        validators: [
          Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songArtist: ['', {
        validators: [
          Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songGenres: ['', {
        validators: [
          //Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songCompanies: ['', {
        validators: [
          //Validators.required
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songRelease: ['', {
        validators: [
          Validators.required,
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songRating: ['', {
        validators: [
          Validators.required,
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songDuration: ['', {
        validators: [
          Validators.required,
        ],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
    });
  }

  ngOnInit(): void {
    // Obtener la URL actual
    this.currentUrl = this.router.url;

    // Comprobar si la URL contiene "edit"
    if (this.currentUrl.includes('edit')) {
      // Cargar los valores del formulario desde el servicio o dejarlos vacíos
      // Aquí debes implementar la lógica para cargar los valores desde el servicio
      
      this.route.paramMap.subscribe(params => {
        this.songId = params.get('songId') ?? ''; // Si params.get('songId') es null, se asigna una cadena vacía

        this.songService.getSongByID(this.songId).subscribe(data => {

          const releaseDate = moment(data.year, 'YYYY');
          const selectedMusician = this.musicians.find(musician => musician.id === data.artist);

          this.genres=data.genre


          this.crudForm.patchValue({
            songTitle: data.title,
            songArtist: data.artist,
            songGenres: "",
            //songCompanies: data.companies, //Refer to README
            songRelease: releaseDate,
            songRating: data.rating,
            songDuration: data.duration
          });

        })
      });
    }

      // Cargar los valores del formulario desde el servicio
      this.artistService.getAllArtist().subscribe(data => {
        this.musicians = data;
      });
  }

  onMusicianSelected(event: any): void {
    this.selectedMusicianId = event.value;
  }

  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = moment().year(normalizedYear.year());
    this.crudForm.get('songRelease')?.setValue(ctrlValue);
    datepicker.close();
  }

  addTag(tagControlName: string, tagArray: string[]) {
    const newTag = this.crudForm.get(tagControlName)?.value.trim();
    if (newTag && !tagArray.includes(newTag)) {
      tagArray.push(newTag);
      this.crudForm.get(tagControlName)?.reset();

    }
  }
  
  removeTag(tag: string, tagArray: string[]) {
    const index = tagArray.indexOf(tag);
    if (index !== -1) {
      tagArray.splice(index, 1);
    }
  }
  
  addGenre() {
    this.addTag('songGenres', this.genres);
  }
  
  removeGenre(tag: string) {
    this.removeTag(tag, this.genres);
  }
  
  addCompany() {
    this.addTag('songCompanies', this.companies);
  }
  
  removeCompany(tag: string) {
    this.removeTag(tag, this.companies);
  }
  

  createSong() {
    let song = {
      title: this.crudForm.get('songTitle')?.value, //Title
      //TODO: Poster Uploader, not implemented due to complexity related to file saving, out of scope with the provided backend
      poster: "http://dummyimage.com/400x600.png/dddddd/000000", //Poster 
      genre: this.genres, //Genres
      year: this.crudForm.get('songRelease')?.value.year(),
      duration: this.crudForm.get('songDuration')?.value,
      rating: this.crudForm.get('songRating')?.value,
      artist: this.crudForm.get('songArtist')?.value
    }

    if (this.currentUrl.includes('edit')) {
      this.songService.editSong(this.songId, song).subscribe(() => {
        const detailsUrl = this.router.url.replace('/edit', '');
        this.router.navigate([detailsUrl]) 
      })
    } else {
      this.songService.createSong(song).subscribe(() => {})
      this.router.navigate(['/']) 
    }
    

    //Out of Scope: Use songCompanies value to add the new song to said company. 
    //JSON-Server does nor provide an endpoint with that specific funcionality
    //It could currently be achieved following these steps:
      //1. Get latest song entry -> get new songID (Could incur in concurrency problems)
      //2. Knowing songID and artistID, retrieve all artists, get the one with said artistID and add the new song to its song array
      //3. PUT the artist back to BD
    //However, as said before, could be considered as an out of scope feature, even so fall into the over-engineering category

    //Out of Scope: Use songArtist value to add the new song to said artist. 
    //JSON-Server does nor provide an endpoint with that funcionality
    //Similar to aforementioned case
  }
  

}
