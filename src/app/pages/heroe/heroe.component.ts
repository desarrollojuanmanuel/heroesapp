import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.models';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private service: HeroesService, private route:ActivatedRoute) { }

  guardar(form: NgForm) {

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let accion: string;
    let peticion: Observable<any>;

    if (form.valid) {
        if (this.heroe.id) {
          accion = 'actualizo';
          peticion = this.service.actualizarHeroe(this.heroe);
        } else {
          accion = 'creo';
          peticion = this.service.crearHeroe(this.heroe);
        }
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: `Se ${ accion } correctamente`,
        type: 'success'
      });
    });
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo') {
      //Swal.showLoading();
      this.service.getHeroe(id).subscribe((rest: HeroeModel) => {
        this.heroe = rest;
        this.heroe.id = id;
      });
    }
  }

}
