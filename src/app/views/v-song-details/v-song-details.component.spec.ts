import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSongDetailsComponent } from './v-song-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from '../../app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('VSongDetailsComponent', () => {
  let component: VSongDetailsComponent;
  let fixture: ComponentFixture<VSongDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VSongDetailsComponent],
      imports: [
        HttpClientTestingModule, // Cambiamos a HttpClientTestingModule
        MatIconModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
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
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        provideClientHydration()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VSongDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
