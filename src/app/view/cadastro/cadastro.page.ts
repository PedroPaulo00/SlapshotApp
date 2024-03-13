import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/controller/services/auth.service';
import { FirebaseService } from 'src/app/controller/services/firebase.service';

function dataNascimentoValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dataNascimento = new Date(control.value);
    const anoLimite = new Date('2005-01-01');
  
    if (dataNascimento >= anoLimite) {
      return { 'dataNascimentoInvalida': true };
    }
    return null;
  }

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  formCadastrar: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {
    this.formCadastrar = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]{1,30}$/)]],
        telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        dataNascimento: ['', [Validators.required, dataNascimentoValidator]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[\w\.-]+@[a-zA-Z]+(\.[a-zA-Z]{2,3}){1,2}$/)]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confSenha: ['', [Validators.required, Validators.minLength(6)]],
        timePreferido: ['', Validators.required],
      }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(fg: FormGroup): { [key: string]: boolean } | null {
    const senha = fg.get('senha')?.value;
    const confSenha = fg.get('confSenha')?.value;
    return senha === confSenha ? null : { 'senhasDiferentes': true };
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
}
