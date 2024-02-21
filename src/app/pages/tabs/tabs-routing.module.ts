import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[  
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'news',
      loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
    },
    {
      path: 'perfil',
      loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
    },
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },

    ]
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}