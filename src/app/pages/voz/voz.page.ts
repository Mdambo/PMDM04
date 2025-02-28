import { Component, OnInit } from '@angular/core';
import { VozService } from '../../servicios/voz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voz',
  templateUrl: './voz.page.html',
  styleUrls: ['./voz.page.scss'],
})
export class VozPage implements OnInit {

  texto: string = '';
  escuchando: boolean = false;

  constructor(private vozService: VozService, private router: Router) {}

  ngOnInit() {
    this.vozService.textoReconocido$.subscribe((textoReconocido) => {
      this.texto = textoReconocido;
      if (this.texto.includes('foto')) {
        this.tomarFoto();
      }
    });
  }

  iniciarEscucha() {
    this.escuchando = true;
    this.vozService.escuchar();
  }

  detenerEscucha() {
    this.escuchando = false;
    this.vozService.detenerEscucha();
  }

  tomarFoto() {
    this.detenerEscucha();
    this.router.navigate(['/camara']); // Redirige a la cámara
  }
}