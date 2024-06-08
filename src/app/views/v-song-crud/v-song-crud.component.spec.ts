import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSongCrudComponent } from './v-song-crud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from '../../app-routing.module';

describe('VSongCrudComponent', () => {
  let component: VSongCrudComponent;
  let fixture: ComponentFixture<VSongCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VSongCrudComponent],
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
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VSongCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
