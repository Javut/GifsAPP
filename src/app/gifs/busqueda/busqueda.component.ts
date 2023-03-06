import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //El ViewChild permite acceder a los elementos del DOM y recuperar variables referenciadas localmente, en caso de encontrarla se asigna a la variable txtBuscar
    // El operador ! o Non-null assertion es para asegurarse que el objeto no es nulo


  constructor(private gifsService: GifsService){}


  buscar(){

   const valor = this.txtBuscar.nativeElement.value;

   if(valor.trim().length === 0){
    return;
   }

   this.gifsService.buscarGifs(valor);

   this.txtBuscar.nativeElement.value = '';


  }

}
