import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalhesPartidaPageRoutingModule } from './detalhes-partida-routing.module';
import { DetalhesPartidaPage } from './detalhes-partida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPartidaPageRoutingModule
  ],
  declarations: [DetalhesPartidaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalhesPartidaPageModule {}
