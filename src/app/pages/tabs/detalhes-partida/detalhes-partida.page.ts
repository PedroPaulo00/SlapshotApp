// detalhes-partida.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-detalhes-partida',
  templateUrl: './detalhes-partida.page.html',
  styleUrls: ['./detalhes-partida.page.scss'],
})
export class DetalhesPartidaPage implements OnInit {
  partidaId: string;
  videoUrlPartida1: string;
  videoUrlPartida2: string;
  videoUrlPartida3: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.partidaId = this.route.snapshot.params['id'];
    console.log('Partida ID:', this.partidaId);
    this.carregarDetalhesPartida(this.partidaId);
    this.inicializarUrlsDeVideo();
  }

  carregarDetalhesPartida(partidaId: string) {
    console.log('Carregando detalhes da partida com ID:', partidaId);
    // Lógica de carregamento dos detalhes da partida
  }

  inicializarUrlsDeVideo() {
    this.videoUrlPartida1 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video1.mp4?alt=media&token=b8e22840-4f38-47a1-a6df-290967d3955f';
    this.videoUrlPartida2 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video3.mp4?alt=media&token=0006cb80-b33b-4b8e-9c2f-9237d2b6867c';
    this.videoUrlPartida3 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video2.mp4?alt=media&token=f8a52f45-410e-475f-ba15-735305d466b1';
  }

  voltarParaHome() {
    this.router.navigate(['/tabs/home']);
  }
}
