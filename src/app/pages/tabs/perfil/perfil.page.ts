import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

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


  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

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
    // Habilita a edição e salva uma cópia original do perfil para restauração posterior
    this.editingProfile = true;
    this.originalProfile = { ...this.userProfile };
  }

  cancelEdit() {
    // Restaura os valores originais do perfil e desativa a edição
    this.userProfile = { ...this.originalProfile };
    this.editingProfile = false;
  }

  saveProfileChanges() {
    if (this.userProfile) {
      // Verifique se todos os campos obrigatórios do userProfile estão definidos
      if (
        this.userProfile.nome // Adicione outros campos conforme necessário
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
    // Remove os espaços em branco e converte para letras minúsculas
    const nomeFormatado = timeNome.toLowerCase().replace(/\s/g, '');

    // Verifica qual time foi selecionado e retorna a URL do logo correspondente
    switch (nomeFormatado) {
        case 'stars':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Fstars.png?alt=media&token=16387a8f-73ef-4dcd-87e3-7421dadcda09';
        case 'avalanche':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Favalanche.png?alt=media&token=e6dccfba-e6c2-4d65-974d-76dcf1a776fb';
        case 'oilers':
            return 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/logos%2Foilers.png?alt=media&token=f1134e41-a2b4-4790-ae95-d2b67136f308';
        // Adicione mais cases conforme necessário para outros times
        default:
            // Se o time não for encontrado, retorna uma URL padrão ou uma URL em branco
            return ''; // ou retorne uma URL padrão caso queira ter uma imagem padrão para times não encontrados.
    }
}

}
