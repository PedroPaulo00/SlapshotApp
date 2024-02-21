// home.page.ts

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  partidas: any[] = [];
  dataAtual: string;

  constructor(private firestore: AngularFirestore, private router: Router) { }

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
    const mes = data.getMonth() + 1; // Os meses são indexados de 0 a 11
    const ano = data.getFullYear();

    // Formatação da data (exemplo: 08/02/2024)
    return `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;
  }

  irParaDetalhesPartida(id: string) {
    this.router.navigate(['/detalhes-partida', id]); // Navegue para a página de detalhes da partida com o ID da partida
  }
}
