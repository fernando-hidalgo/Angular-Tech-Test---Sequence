import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VHomeComponent } from './views/v-home/v-home.component';
import { VSongDetailsComponent } from './views/v-song-details/v-song-details.component';
import { VSongCrudComponent } from './views/v-song-crud/v-song-crud.component';
import { CSongCardComponent } from './components/c-song-card/c-song-card.component';
import { CNavbarComponent } from './components/c-navbar/c-navbar.component';

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
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
