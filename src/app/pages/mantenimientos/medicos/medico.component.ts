import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { tick } from '@angular/core/testing';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico| undefined;
  public hospitalSeleccionado: Hospital| undefined;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.cargarMedico( id ));
    
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required ]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
      })

  }

  cargarMedico(id:string){

    if( id === 'nuevo' ){
      return;
    }

    this.medicoService.obtenerMedicoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe((medico: any) => {
        const { nombre, hospital:{ _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      },(err)=>{
          return this.router.navigateByUrl(`/dashboard/medicos`);
      });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value

    if (this.medicoSeleccionado){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } Actualizado correctamente`, `success`);
        })
    } else {
      //crear
      
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, `success`);
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
      })
    }
  }

}
