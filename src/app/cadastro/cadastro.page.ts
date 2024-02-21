import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  formCadastrar: FormGroup;
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
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {
    this.formCadastrar = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]],
      timePreferido: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (!this.formCadastrar.valid) {
      this.alert.presentAlert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const formData = this.formCadastrar.value;
    if (formData.senha !== formData.confSenha) {
      this.alert.presentAlert('Erro', 'As senhas não coincidem.');
      return;
    }

    this.authService.signUpWithEmailAndPassword(formData.email, formData.senha)
      .then((credential) => {
        const userUid = credential.user?.uid;
        if (userUid) {
          const userDetails = {
            nome: formData.nome,
            telefone: formData.telefone,
            dataNascimento: formData.dataNascimento,
            cpf: formData.cpf,
            email: formData.email,
            timePreferido: formData.timePreferido
          };
          this.firebaseService.addUserDetails(userUid, userDetails)
            .then(() => {
              this.alert.presentAlert('Sucesso', 'Usuário cadastrado com sucesso.');
              this.router.navigate(['/login']);
            })
            .catch((error) => {
              console.error('Erro ao adicionar detalhes do usuário ao Firestore:', error);
              this.alert.presentAlert('Erro', 'Erro ao cadastrar usuário.');
            });
        }
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        this.alert.presentAlert('Erro', 'Erro ao cadastrar usuário.');
      });
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
        default:
            // Se o time não for encontrado, retorna uma URL padrão ou uma URL em branco
            return ''; // ou retorne uma URL padrão caso queira ter uma imagem padrão para times não encontrados.
    }
}

}
