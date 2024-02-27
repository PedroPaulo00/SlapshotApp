import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'; // Importe o ScreenOrientation

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
  videoUrlPartida4: string;
  videoUrlPartida5: string;
  videoUrlPartida6: string;
  backButtonVisible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    this.partidaId = this.route.snapshot.params['id'];
    console.log('Partida ID:', this.partidaId);
    this.carregarDetalhesPartida(this.partidaId);
    this.inicializarUrlsDeVideo();

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    setTimeout(() => {
      this.backButtonVisible = false;
    }, 10000);
  }

  carregarDetalhesPartida(partidaId: string) {
    console.log('Carregando detalhes da partida com ID:', partidaId);
  }

  inicializarUrlsDeVideo() {
    this.videoUrlPartida1 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video1.mp4?alt=media&token=b8e22840-4f38-47a1-a6df-290967d3955f';
    this.videoUrlPartida2 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video3.mp4?alt=media&token=0006cb80-b33b-4b8e-9c2f-9237d2b6867c';
    this.videoUrlPartida3 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/template_video2.mp4?alt=media&token=f8a52f45-410e-475f-ba15-735305d466b1';
    this.videoUrlPartida4 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/Brad%20Marchand%20spectacular%20shorthanded%20goal%206_6_11%20(480p%2C%20h264).mp4?alt=media&token=7db7589f-aa95-4afc-b3bf-739c99436d2d';
    this.videoUrlPartida5 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/Sergei%20Bobrovsky%20Throws%20PUNCHES%20At%20Brady%20Tkachuk%20As%20Brother%20vs.%20Brother%20Heats%20Up%20(720p%2C%20h264).mp4?alt=media&token=bcf19f8d-cbe0-4299-9fd5-ab7bd5b7bf67';
    this.videoUrlPartida6 = 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/Vince%20Dunn%20Snipes%20For%20Seattle%20Krakens%20First%20Ever%20Home%20Goal%20(720p%2C%20h264).mp4?alt=media&token=500ee0dd-af18-4b9e-8464-517cd6226cec';
  }

  voltarParaHome() {
    this.router.navigate(['/tabs/home']);
  }

  mostrarBotaoVoltar() {
    this.backButtonVisible = true;
  }

  detectarToque(event: any) {
    if (event.clientX > window.innerWidth / 2) {
      this.mostrarBotaoVoltar();
    }
  }

  ionViewWillLeave() {
    this.screenOrientation.unlock();
  }
}
