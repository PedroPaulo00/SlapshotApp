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
