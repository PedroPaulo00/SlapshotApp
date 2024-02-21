import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPartidaPage } from './detalhes-partida.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPartidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPartidaPageRoutingModule {}
