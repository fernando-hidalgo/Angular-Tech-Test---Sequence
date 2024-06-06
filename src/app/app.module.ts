import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VHomeComponent } from './views/v-home/v-home.component';
import { VSongDetailsComponent } from './views/v-song-details/v-song-details.component';
import { VSongCrudComponent } from './views/v-song-crud/v-song-crud.component';
import { CSongCardComponent } from './components/c-song-card/c-song-card.component';
import { CNavbarComponent } from './components/c-navbar/c-navbar.component';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

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

    //NG Prime Components
    CardModule,
    SidebarModule,
    ButtonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync() //Added to solve NG02801 warning, raised due to JSON Server mocked backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
