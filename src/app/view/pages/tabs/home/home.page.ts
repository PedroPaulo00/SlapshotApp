// home.page.ts

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  partidas: any[] = [];
  dataAtual: string;

  constructor(private firestore: AngularFirestore, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.carregarPartidas();
    this.dataAtual = this.obterDataAtual();
  }

  carregarPartidas() {
    this.firestore.collection('partidas').snapshotChanges().subscribe(partidas => {
      this.partidas = partidas.map(partida => {
        const data = partida.payload.doc.data() as any;
        const id = partida.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  obterDataAtual() {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    return `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;
  }

  irParaDetalhesPartida(id: string) {
    this.router.navigate(['/detalhes-partida', id]); 
  }
  
  filtrarPartidas(nome: string) {
    if (!nome.trim()) {
      this.carregarPartidas();
      return;
    }

    this.partidas = this.partidas.filter(partida =>
      partida.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  irParaConfig() {
    this.router.navigate(['/tabs/config']); 
  }
}
