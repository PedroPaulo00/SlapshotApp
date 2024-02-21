import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogar: FormGroup;

  constructor(
    private alert: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this.formLogar.controls;
  }

  submitForm(): void {
    if (this.formLogar.invalid) {
      this.alert.presentAlert('Erro', 'Erro ao preencher os campos!');
    } else {
      this.alert.simpleLoader();
      this.logar();
    }
  }

  private logar(): void {
    const email = this.formLogar.value['email'];
    const senha = this.formLogar.value['senha'];

    this.authService.signIn(email, senha)
      .then((res) => {
        this.alert.dismissLoader();
        this.alert.presentAlert("Olá", "Seja bem-vindo!");
        this.router.navigate(["/tabs/home"]); // Corrigido para redirecionar para "/tabs/home" após o login bem-sucedido
      })
      .catch((error) => {
        this.alert.dismissLoader();
        this.alert.presentAlert("Erro", "Email e/ou senha incorretos!");
        console.log(error.message);
      });
  }

  irParaCadastro(): void {
    this.router.navigate(["/cadastro"]);
  }
}
