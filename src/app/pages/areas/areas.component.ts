import { Component, Input, OnInit } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Area } from 'src/app/models/areas.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  @Input() areas: Area[] | undefined;
  formAdd: FormGroup | any;
  formAct:FormGroup | any;
  area: Area= new Area();
   info: Area[]=[];
    cargando=false;
    getAreas=false;
  constructor(private areaService: AreasService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formAdd=this._fb.group({
      // id: [0],
      Nombre: ['', Validators.required],
      codigo: [null, [Validators.required,Validators.maxLength(2)]],
      lider: [null,[Validators.maxLength(7)]],
      estado: [true]
    });
    this.formAct=this._fb.group({
      id: [0],
      Nombre: ['', Validators.required],
      codigo: [null, [Validators.required,Validators.maxLength(2)]],
      lider: [null,[Validators.maxLength(7)]],
      estado: [true]
    });
    this.cargando=true;
    this.areaService.cargarAreas().subscribe((resp: any) => {
      this.info=resp.areas;
      this.cargando=false;
      this.getAreas= true;
    });
  }

  guardar(){
    if(this.formAdd.invalid){
      // console.log('formulario invalido');
      Swal.fire({
        title: 'incompleto',
        icon: 'error',
        text: 'por favor llene el formulario completo',
        allowOutsideClick: false
      });
      return;
    }
    Swal.fire({
      title: 'espere',
      icon: 'info',
      text: 'guardando info',
      allowOutsideClick: false
    });
    Swal.showLoading();
      this.areaService.crearArea(this.formAdd.value).subscribe((resp: any)=> {
        if(resp.ok===true){
          Swal.fire({
            title: resp.area.Nombre,
            text: resp.msg,
            icon: 'success'

          });
        }
        this.areaService.cargarAreas().subscribe((resp: any) => {
          this.info=resp.areas;
          this.cargando=false;
          this.getAreas= true;
        });
      })
  }
form(area: Area){
  console.log(area);
this.formAct.setValue({
  id: area.id,
  Nombre: area.Nombre,
  codigo: area.codigo,
  lider: area.lider,
  estado: area.estado,
})
}
  Actualizar(){
    if(this.formAct.invalid){
      // console.log('formulario invalido');
      Swal.fire({
        title: 'incompleto',
        icon: 'error',
        text: 'por favor llene el formulario completo',
        allowOutsideClick: false
      });
      return;
    }
    Swal.fire({
      title: 'espere',
      icon: 'info',
      text: 'guardando info',
      allowOutsideClick: false
    });
    Swal.showLoading();
      this.areaService.actArea(this.formAct.value).subscribe((resp: any)=> {
        if(resp.ok===true){
          Swal.fire({
            title: resp.area.Nombre,
            text: resp.msg,
            icon: 'success'

          });
        }
        this.areaService.cargarAreas().subscribe((resp: any) => {
          this.info=resp.areas;
          this.cargando=false;
          this.getAreas= true;
        });
      })



  }

  borrarArea(area: Area|any, i: number){
    Swal.fire({
      title: '¿esta seguro?',
      text: 'desea borrar esta Area?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then(resp =>{
      if(resp.value){
        this.info.splice(i,1);
    this.areaService.borrarArea(area.id).subscribe((resp:any) => {
      if(resp.ok===false) {
        Swal.fire(
          'Error',
          `${ resp.msg }`,
          'error'
        )
      }else {
        this.areaService.cargarAreas().subscribe((resp: any) => {
          Swal.fire(
            'Area borrada',
            `El area fue eliminada correctamente`,
            'success'
          );
          this.info=resp.areas;
          this.cargando=false;
          this.getAreas= true;
        });
      }

    });

      }
    });

  }

}

