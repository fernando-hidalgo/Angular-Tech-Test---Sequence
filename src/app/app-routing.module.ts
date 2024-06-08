import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'', component: AppComponent, children: [
    {
      path: '',
      loadChildren: () => import('./views/v-home/v-home.module').then(x => x.VHomeModule)
    },
    {
      path: 'song/new',
      loadChildren: () => import('./views/v-song-crud/v-song-crud.module').then(x => x.VSongCrudModule)
    },
    {
      path: 'song/:songId',
      loadChildren: () => import('./views/v-song-details/v-song-details.module').then(x => x.VSongDetailsModule)
    },
    {
      path: 'song/:songId/edit',
      loadChildren: () => import('./views/v-song-crud/v-song-crud.module').then(x => x.VSongCrudModule)
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
