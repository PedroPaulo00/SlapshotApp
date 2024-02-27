import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetalhesPartidaPage } from './view/pages/tabs/detalhes-partida/detalhes-partida.page';
import { HomePage } from './view/pages/tabs/home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'detalhes-partida/:id',
    component: DetalhesPartidaPage
  },
  {
    path: 'tabs',
    loadChildren: () => import('./view/pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./view/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'detalhes-partida',
    loadChildren: () => import('./view/pages/tabs/detalhes-partida/detalhes-partida.module').then( m => m.DetalhesPartidaPageModule)
  },
  {
    path: 'home', 
    component: HomePage 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }