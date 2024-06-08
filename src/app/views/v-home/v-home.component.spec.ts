import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Cambiamos a HttpClientTestingModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { VHomeComponent } from './v-home.component';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { provideClientHydration } from '@angular/platform-browser';
import { createTranslateLoader } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('VHomeComponent', () => {
  let component: VHomeComponent;
  let fixture: ComponentFixture<VHomeComponent>;
  let songService: SongService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VHomeComponent],
      imports: [
        HttpClientTestingModule, // Cambiamos a HttpClientTestingModule
        MatSidenavModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader), //AoT Config
            deps: [HttpClient],
          },
          defaultLanguage: 'es'
        }), //i18n
      ],
      providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(VHomeComponent);
    component = fixture.componentInstance;
    songService = TestBed.inject(SongService); // Inyectamos SongService
    httpMock = TestBed.inject(HttpTestingController); // Inyectamos HttpTestingController
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verificamos que no hayan solicitudes pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load songs on initialization', fakeAsync(() => {
    const mockSongs: Song[] = [
      { id: 1, title: 'Song 1', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 },
      { id: 2, title: 'Song 2', artist: 1, duration: 1, genre: ["Pop", "Rock"],poster: "URL", rating:1, year:1990 },
    ];
    spyOn(songService, 'getSongs').and.returnValue(of(mockSongs)); // Simulamos el servicio getSongs()

    component.ngOnInit();
    tick(1000); // Simulamos el tiempo de espera

    expect(component.songs).toEqual(mockSongs); // Verificamos si las canciones se cargaron correctamente
  }));

  it('should close sidenav', () => {
    const reason = 'Reason for closing';
    const sidenavCloseSpy = spyOn(component.sidenav, 'close').and.callThrough(); // Espiamos el método close de MatSidenav
    component.close(reason);
    expect(component.reason).toEqual(reason); // Verificamos si la razón se estableció correctamente
    expect(sidenavCloseSpy).toHaveBeenCalled(); // Verificamos si se llamó al método close de MatSidenav
  });
});

