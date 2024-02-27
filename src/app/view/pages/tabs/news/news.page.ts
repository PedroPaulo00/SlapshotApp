  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { IonicSlides } from '@ionic/angular';
  import { FirebaseService } from 'src/app/controller/services/firebase.service';

  @Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
  })
  export class NewsPage implements OnInit {
    swiperModules=[IonicSlides];
    noticias: any[] = [];
    noticiasFiltradas: any[] = [];
    termoPesquisa: string = '';
    
    constructor(private router: Router, private firebaseService: FirebaseService) { }

    ngOnInit() {
      this.carregarNoticias();
    }

    irParaConfig() {
      this.router.navigate(['/tabs/config']); 
    }

    carregarNoticias() {
      this.firebaseService.getNoticias().subscribe((noticias: any[]) => {
        this.noticias = noticias.sort((a, b) => {
          const dataA = new Date(a.data_publicacao);
          const dataB = new Date(b.data_publicacao);

          return dataB.getTime() - dataA.getTime();
        });
        this.filtrarNoticias();
      });
    }    

    filtrarNoticias() {
      if (this.termoPesquisa.trim() === '') {
        this.noticiasFiltradas = this.noticias;
      } else {
        const termo = this.termoPesquisa.toLowerCase();
        this.noticiasFiltradas = this.noticias.filter(noticia =>
          noticia.titulo.toLowerCase().includes(termo) || noticia.fonte.toLowerCase().includes(termo)
        );
      }
    }
  }
