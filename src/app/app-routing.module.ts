import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VHomeComponent } from './views/v-home/v-home.component';
import { VSongDetailsComponent } from './views/v-song-details/v-song-details.component';
import { VSongCrudComponent } from './views/v-song-crud/v-song-crud.component';

const routes: Routes = [
  {path:'', component: VHomeComponent},
  {path:'new', component: VSongCrudComponent},
  {path:':songId', component: VSongDetailsComponent},
  {path:':songId/edit', component: VSongCrudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
