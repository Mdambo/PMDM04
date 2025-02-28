import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VozService {

  private textoReconocido = new BehaviorSubject<string>('');
  public textoReconocido$ = this.textoReconocido.asObservable();

  constructor() { }

  async escuchar() {

    await SpeechRecognition.start({
      prompt: "Say something",
      maxResults: 1,
      partialResults: true,
      language: 'es-ES'
      });

      var palabras = await new Promise<string[]>((resolve, reject) => {
            // Set a timeout for recognition (if the user takes too long)
            const timeout = setTimeout(() => {
              reject('Speech recognition timeout');
            }, 10000); // 10 seconds timeout

            // Listen for partial results and add them to 'palabras'
            SpeechRecognition.addListener('partialResults', (result: any) => {
              var palabra = result.matches[0].toLowerCase();
              console.log('MyIonicApp', 'Palabra (voz.service.ts):', palabra);
              palabras.push(palabra);
              console.log('MyIonicApp', 'Palabras (voz.service.ts):', palabras);
            });
          });
  }

  detenerEscucha() {
    SpeechRecognition.stop();
    console.log('MyIonicApp', 'Escucha detenida');
  }
}