import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async openCardForm() {
    const alert = await this.alertController.create({
      header: 'Adicionar Cartão de Crédito',
      inputs: [
        {
          name: 'numero',
          type: 'text',
          placeholder: 'Número do Cartão'
        },
        {
          name: 'dataValidade',
          type: 'text',
          placeholder: 'Data de Validade (MM/AA)'
        },
        {
          name: 'cvv',
          type: 'password',
          placeholder: 'CVV'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            console.log('Dados do cartão:', data);
          }
        }
      ]
    });

    await alert.present();
  }

  async openDebForm() {
    const alert = await this.alertController.create({
      header: 'Adicionar Cartão de Débito',
      inputs: [
        {
          name: 'numero',
          type: 'text',
          placeholder: 'Número do Cartão'
        },
        {
          name: 'dataValidade',
          type: 'text',
          placeholder: 'Data de Validade (MM/AA)'
        },
        {
          name: 'cvv',
          type: 'password',
          placeholder: 'CVV'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            console.log('Dados do cartão de débito:', data);
          }
        }
      ]
    });

    await alert.present();
  }

    async openPixForm() {
      const alert = await this.alertController.create({
        header: 'QR CODE PIX',
        message: 'QR CODE GERADO AQUI'
      });
      await alert.present();
    }
}
