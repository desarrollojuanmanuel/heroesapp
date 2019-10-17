import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-40d5f.firebaseio.com';

  constructor(private http: HttpClient) { }

  /**
   * Metodo encargado de crear un heroe, el .json es especifico de firebase
   * @param:heroe HeroeModel
   */
  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(map( (resp: any) => {
        console.log(resp);
        heroe.id = resp.name;
        console.log(heroe);
        return heroe;
      })
    );
  }

  /**
   * Metodo encargado de actualizar un heroe, el .json es especifico de firebase
   * @param:heroe HeroeModel
   */
  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  /**
   * Metodo encargado de actualizar un heroe, el .json es especifico de firebase
   * @param:heroe HeroeModel
   */
  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map(this.crearArreglo )
    );
  }

  /**
   * Metodo encargado de obtener un heroe por medio de su id
   * @param:id string
   */
  getHeroe(id: string){
    return this.http.get(`${ this.url  }/heroes/${ id }.json`);
  }

  /**
   * Metodo encargado de borrar un heroe por medio de su id
   * @param:id string
   */
  public borrarHeroe(id: string){
    return this.http.delete(`${ this.url  }/heroes/${ id }.json`);
  }

  /**
   * Metodo encargado crear un arreglo apartir de un objeto
   * @param:id string
   */
  private crearArreglo( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    if (heroesObj !== null) {
        Object.keys(heroesObj).forEach( key => {
          const heroe: HeroeModel = heroesObj[key]
          heroe.id = key;
          heroes.push(heroe);
        });
    }
    return heroes;
  }

}
