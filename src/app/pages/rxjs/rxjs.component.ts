import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    // this.regresaObservable().pipe (
    //   retry(2)
    // ).subscribe (
    //    numero => console.log('subs', numero ),
    //    error => console.log('error en la obs', error ),
    //    () => console.log('el obs termino!')
    // );

    this.regresaObservable().subscribe (
       numero => console.log('subs', numero ),
       error => console.log('error en la obs', error ),
       () => console.log('el obs termino!')
    );
  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador +=1;
        
        const salida = {
          valor: contador
        };

        observer.next(salida);
        if (contador === 5) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if (contador === 2) {
        //   //clearInterval(intervalo);
        //   observer.error('dio 2 error help!!!');
        // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        //console.log('Filter', valor, index);
        if ((valor % 2) === 1) {
           return true 
        } else {
          return false;
        }
      })
    );
  }
}