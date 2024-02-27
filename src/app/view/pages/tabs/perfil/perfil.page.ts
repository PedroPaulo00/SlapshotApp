import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/controller/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userProfile: any = {};
  editingProfile: boolean = false;
  originalProfile: any;
  times = [
    { nome: 'Avalanche' },
    { nome: 'Blackhawks' },
    { nome: 'Blues' },
    { nome: 'Bruins' },
    { nome: 'Canadiens' },
    { nome: 'Canucks' },
    { nome: 'Capitals' },
    { nome: 'Coyotes' },
    { nome: 'Devils' },
    { nome: 'Ducks' },
    { nome: 'Flames' },
    { nome: 'Flyers' },
    { nome: 'Hurricanes' },
    { nome: 'Islanders' },
    { nome: 'Jets' },
    { nome: 'Kings' },
    { nome: 'Kraken' },
    { nome: 'Leafs' },
    { nome: 'Lightning' },
    { nome: 'Wild' },
    { nome: 'Oilers' },
    { nome: 'Panthers' },
    { nome: 'Penguins' },
    { nome: 'Predators' },
    { nome: 'Rangers' },
    { nome: 'Red Wings' },
    { nome: 'Sabres' },
    { nome: 'Senators' },
    { nome: 'Sharks' },
    { nome: 'Stars' },
    { nome: 'Wild' },
  ];


  constructor(private authService: AuthService, private firestore: AngularFirestore,private router: Router) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(user => {
      console.log('Dados do usuário:', user);
      if (user) {
        this.firestore.collection('users').doc(user.uid).get().subscribe(userData => {
          if (userData.exists) {
            this.userProfile = userData.data();
          } else {
            console.error('Dados do perfil não encontrados no Firestore.');
          }
        });
      } else {
        console.error('Usuário não autenticado.');
      }
    });
  }

  editProfile() {
    this.editingProfile = true;
    this.originalProfile = { ...this.userProfile };
  }

  cancelEdit() {
    this.userProfile = { ...this.originalProfile };
    this.editingProfile = false;
  }

  saveProfileChanges() {
    if (this.userProfile) {
      if (
        this.userProfile.nome 
      ) {
        this.authService.getCurrentUserId().then(uid => {
          if (uid) {
            this.firestore.collection('users').doc(uid).update(this.userProfile)
              .then(() => {
                console.log('Perfil atualizado com sucesso.');
                this.editingProfile = false;
              })
              .catch(error => {
                console.error('Erro ao atualizar perfil:', error);
              });
          } else {
            console.error('Erro ao atualizar perfil: ID do usuário é nulo.');
          }
        }).catch(error => {
          console.error('Erro ao obter ID do usuário:', error);
        });
      } else {
        console.error('Erro ao atualizar perfil: campos obrigatórios não estão definidos.');
      }
    } else {
      console.error('Erro ao atualizar perfil: this.userProfile é undefined');
    }
  }  

  getLogoUrl(timeNome: string): string {
    const nomeFormatado = timeNome.toLowerCase().replace(/\s/g, '');

    switch (nomeFormatado) {
        case 'avalanche':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Favalanche.png?alt=media&token=e6dccfba-e6c2-4d65-974d-76dcf1a776fb';
        case 'blackhawks':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fblackhawks.png?alt=media&token=4a8e13fd-846b-42bf-9e9a-1e198b0d2df4';
        case 'blues':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fblues.png?alt=media&token=f1e2844a-16c3-42f6-b67f-0a5bf94e6d0e';
        case 'bruins':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fbruins.png?alt=media&token=fd5345b1-0a9a-4e76-8a4a-12b800d1d4f1';
        case 'canadiens':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fcanadiens.png?alt=media&token=3804babc-18d3-4a65-8019-0d1d3520fd3e';
        case 'canucks':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fcanucks.png?alt=media&token=018dd1d3-8a82-4a9b-8483-8c18338bbf89';
        case 'capitals':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fcapitals.png?alt=media&token=35a68a9e-4b34-4b59-a1e5-9c41dc35e6cf';
        case 'coyotes':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fcoyotes.png?alt=media&token=f01b1e5a-7b1f-4df2-9be1-8e6475b9a793';
        case 'devils':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fdevils.png?alt=media&token=622457bb-015f-4b58-8fa3-11c0b4963b8a';
        case 'ducks':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fducks.png?alt=media&token=156f6078-8b9a-41f1-9b7a-86d6ea8756fd';
        case 'flames':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fflames.png?alt=media&token=9a876ce0-183e-4e54-8929-3056c2b40119';
        case 'flyers':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fflyers.png?alt=media&token=22febd40-8d08-49a1-8948-b72b3c6f3a5c';
        case 'hurricanes':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fhurricanes.png?alt=media&token=d17452c6-d490-499f-a043-10e2b4c8fa3a';
        case 'islanders':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fislanders.png?alt=media&token=539e9e2c-f732-49ac-8db5-7ddc01132d3f';
        case 'jets':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fjets.png?alt=media&token=62bbae46-c0c8-4ecb-8554-cf3c77764b95';
        case 'kings':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fkings.png?alt=media&token=d9d8fe93-d014-4ba5-947b-4323f013e9c1';
        case 'kraken':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fkraken.png?alt=media&token=d8ab784d-4a9e-4b70-9a3c-f6b5b2a456f4';
        case 'leafs':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fleafs.png?alt=media&token=36e8b674-b8e7-4f97-8327-2a345f6cf727';
        case 'lightning':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Flightning.png?alt=media&token=8f2585d4-f11a-4d88-b175-5de14e4eddb9';
        case 'wild':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fwild.png?alt=media&token=5e30c9d8-45a9-4931-b0b2-e681cf81d55e';
        case 'oilers':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Foilers.png?alt=media&token=f1134e41-a2b4-4790-ae95-d2b67136f308';
        case 'panthers':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fpanthers.png?alt=media&token=bca946d1-5e6d-46bb-b593-0802854bd365';
        case 'penguins':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fpenguins.png?alt=media&token=6250c85c-280a-4594-8486-01a86d7fb79a';
        case 'predators':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fpredators.png?alt=media&token=ea60fbcf-0113-44e0-950a-86e64b458bc2';
        case 'rangers':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Frangers.png?alt=media&token=48a84009-d867-42ac-a50b-5f3dbf5b7ba3';
        case 'redwings':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fredwings.png?alt=media&token=417b79b2-fa48-4599-8151-eb64c18d81fb';
        case 'sabres':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fsabres.png?alt=media&token=f74e0032-c65d-4642-abe1-fb222da4f24d';
        case 'senators':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fsenators.png?alt=media&token=39e09b08-d9e7-49eb-8722-9a5e9149b05d';
        case 'sharks':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fsharks.png?alt=media&token=3c0f1493-c51b-47e2-8f7e-b9a34b9df8b4';
        case 'stars':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fstars.png?alt=media&token=16387a8f-73ef-4dcd-87e3-7421dadcda09';
        default:
            return ''; 
    }
}



redirectToPaymentTab() {
  this.router.navigate(['/tabs/payment']);
}

signOut() {
  this.authService.signOut().then(() => {
    console.log('Usuário desconectado com sucesso.');
    this.router.navigate(['/login']);
  }).catch(error => {
    console.error('Erro ao desconectar o usuário:', error);
  });
}

}
