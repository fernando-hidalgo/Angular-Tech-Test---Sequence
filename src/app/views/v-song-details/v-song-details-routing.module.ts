import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VSongDetailsComponent } from './v-song-details.component';

const routes: Routes = [
  {
    path: '',
    component: VSongDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VSongDetailsRoutingModule { }
