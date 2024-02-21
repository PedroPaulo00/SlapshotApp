import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetalhesPartidaPage } from './pages/tabs/detalhes-partida/detalhes-partida.page';
import { HomePage } from './pages/tabs/home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'detalhes-partida/:id',
    component: DetalhesPartidaPage // Rota para a página de detalhes da partida com um parâmetro de ID
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'detalhes-partida',
    loadChildren: () => import('./pages/tabs/detalhes-partida/detalhes-partida.module').then( m => m.DetalhesPartidaPageModule)
  },
  {
    path: 'home', // Adicione esta rota para a página de home
    component: HomePage // Especifique o componente que deve ser carregado
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }