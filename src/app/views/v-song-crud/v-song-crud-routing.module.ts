import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VSongCrudComponent } from './v-song-crud.component';

const routes: Routes = [
  {
    path: '',
    component: VSongCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VSongCrudRoutingModule { }
