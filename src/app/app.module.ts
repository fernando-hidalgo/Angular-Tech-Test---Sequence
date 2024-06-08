import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VHomeComponent } from './views/v-home/v-home.component';
import { VSongDetailsComponent } from './views/v-song-details/v-song-details.component';
import { VSongCrudComponent } from './views/v-song-crud/v-song-crud.component';
import { CSongCardComponent } from './components/c-song-card/c-song-card.component';
import { CNavbarComponent } from './components/c-navbar/c-navbar.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';

//PrimeNG
import { CardModule } from 'primeng/card';

//Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    VHomeComponent,
    VSongDetailsComponent,
    VSongCrudComponent,
    CSongCardComponent,
    CNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader), //AoT Config
        deps: [HttpClient],
      },
      defaultLanguage: 'es'
    }), //i18n

    //NG Prime Components
    CardModule,

    //Material Components
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatChipsModule,
    MatSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(), //Added to solve NG02801 warning, raised due to JSON Server mocked backend
    provideNativeDateAdapter() //Mandatory for Angular Material Datepicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
