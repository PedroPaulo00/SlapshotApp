import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltarParaHome() {
    this.router.navigate(['/tabs/home']);
  }

}
