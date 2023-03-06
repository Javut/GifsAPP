import { HttpClient, HttpParams } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey : string = 'A0hABv5mxHulQb6JoXR6jfdPVIekNoq2';
    private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
    private _historial: string[] = [];

    public resultados: Gif[] = [];

    get historial(){
      return [...this._historial];
    }

    constructor(private http: HttpClient){

      this._historial = JSON.parse(localStorage.getItem('historial')!) || []; // Se usa el operador '!' para afirmar que el operando no es nulo ni indefinido, para este contexto
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
      // if(localStorage.getItem('historial')){
      //   this._historial = JSON.parse(localStorage.getItem('historial')!)
      // }

    }



    buscarGifs(query: string){

      query = query.trim().toLocaleLowerCase();

     if(!this._historial.includes(query)){
          this._historial.unshift(query);
          this._historial = this._historial.splice(0,10);

          localStorage.setItem('historial', JSON.stringify(this._historial)); //De esta forma grabo en el localStorage del navegador
     }

      //El subscribe se ejecuta una vez tengamos la resolución del get, es similar a un .then

      const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

          console.log(params.toString());


      //al poner el get con el operador diamante se le indica a typescript que la respuesta luce como está interfaz : SearchGifsResponse
      this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
                .subscribe(( resp : SearchGifsResponse) => {
                  console.log(resp.data);
                  this.resultados = resp.data;
                  localStorage.setItem('resultados', JSON.stringify(this.resultados));
                })

      console.log(this._historial);

    }

}
