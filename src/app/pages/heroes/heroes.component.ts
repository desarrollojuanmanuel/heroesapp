import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  registros = false;

  constructor(private service: HeroesService) {}

  ngOnInit() {
    this.cargando = true;
    this.service.getHeroes().subscribe( resp => {
      this.cargando = false;
      if (resp.length < 1) {
          this.registros = true;
          console.log("neas");
      }

      this.heroes = resp
    });
  }

  borrarHeroe( heroe: HeroeModel, i: number){
    Swal.fire({
      title:'Confirmacion',
      text:`Confirma eliminar el heroe ${ heroe.nombre }`,
      type:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if(resp.value){
        this.heroes.splice(i, 1);
        this.service.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
