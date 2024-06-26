import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song.service';
import { ArtistService } from '../../services/artist.service';
import { CRUDFormFields, DATEPICKER_FORMAT, Navigation, URLParams } from '../../../constants';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-v-song-crud',
  templateUrl: './v-song-crud.component.html',
  styleUrl: './v-song-crud.component.scss',
  providers: [provideMomentDateAdapter(DATEPICKER_FORMAT),],
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
        validators: [Validators.required],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songArtist: ['', {
        validators: [Validators.required],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songGenres: ['', {
        validators: [],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songCompanies: ['', {
        validators: [],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songRelease: ['', {
        validators: [Validators.required,],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songRating: ['', {
        validators: [Validators.required,],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      songDuration: ['', {
        validators: [Validators.required,],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
    });
  }

  ngOnInit(): void {
    // Get current URL
    this.currentUrl = this.router.url;

    setTimeout(() => {
      // Checks if URL contains "edit"
      if (this.currentUrl.includes(Navigation.EDIT)) {
        this.route.paramMap.subscribe(params => {
          this.songId = params.get(URLParams.songId) ?? '';


          this.songService.getSongByID(this.songId).subscribe(data => {
            //Set values for them to show properly in edit view
            const releaseDate = moment(data.year, 'YYYY');
            this.genres = data.genre

            //Set Form values to Song current values, in order to edit them
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

      this.artistService.getAllArtist().subscribe(data => {
        this.musicians = data;
      });
      
    }, 1000); // Simulating a delay of 1 seconds, as requested
  }

  onMusicianSelected(event: any): void {
    this.selectedMusicianId = event.value;
  }

  //Rips year out of moment type, needed to correct display and saving
  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = moment().year(normalizedYear.year());
    this.crudForm.get(CRUDFormFields.songRelease)?.setValue(ctrlValue);
    datepicker.close();
  }

  //Add genre tag to array, needed to correct display and saving
  addTag(tagControlName: string, tagArray: string[]) {
    const newTag = this.crudForm.get(tagControlName)?.value.trim();
    if (newTag && !tagArray.includes(newTag)) {
      tagArray.push(newTag);
      this.crudForm.get(tagControlName)?.reset();

    }
  }

  //Removes selected genre tag
  removeTag(tag: string, tagArray: string[]) {
    const index = tagArray.indexOf(tag);
    if (index !== -1) {
      tagArray.splice(index, 1);
    }
  }

  addGenre() {
    this.addTag(CRUDFormFields.songGenres, this.genres);
  }

  removeGenre(tag: string) {
    this.removeTag(tag, this.genres);
  }

  addCompany() {
    this.addTag(CRUDFormFields.songCompanies, this.companies);
  }

  removeCompany(tag: string) {
    this.removeTag(tag, this.companies);
  }


  createSong() {
    //Creates DTO object
    let song = {
      title: this.crudForm.get(CRUDFormFields.songTitle)?.value, //Title
      //TODO: Poster Uploader, not implemented due to complexity related to file saving, out of scope with the provided backend
      poster: "http://dummyimage.com/400x600.png/dddddd/000000", //Poster 
      genre: this.genres, //Genres
      year: this.crudForm.get(CRUDFormFields.songRelease)?.value.year(),
      duration: this.crudForm.get(CRUDFormFields.songDuration)?.value,
      rating: this.crudForm.get(CRUDFormFields.songRating)?.value,
      artist: this.crudForm.get(CRUDFormFields.songArtist)?.value
    }

    //If in "edit mode", song is edited with new data
    if (this.currentUrl.includes(Navigation.EDIT)) {
      this.songService.editSong(this.songId, song).subscribe(() => {
        const editUrlSegment = `/${Navigation.EDIT}`;
        const detailsUrl = this.router.url.replace(new RegExp(editUrlSegment, 'g'), '');
        this.router.navigate([detailsUrl])
      })
    //If not, a new song is created
    } else {
      this.songService.createSong(song).subscribe(() => { })
      this.router.navigate([Navigation.BASE])
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
