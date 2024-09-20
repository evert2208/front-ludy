import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuarios.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AreasService } from 'src/app/services/areas.service';
import { Area } from 'src/app/models/areas.model';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @Input() usuarios: Usuario[] | undefined;
  formAdd: FormGroup | any;
  formAct:FormGroup | any;
  user: Usuario= new Usuario();
  areas: Area[]=[];
   info: Usuario[]=[];
    cargando=false;
    getUsuarios=false;
  constructor(private userService: UsuariosService,
    private _fb: FormBuilder,
    private areaService: AreasService,
  ) { }

  ngOnInit(): void {
    this.formAdd=this._fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: [Date()],
      email: ['', [Validators.required, Validators.email]],
      numDoc: [0, Validators.required],
      area: [null],
      salario: [0],
      estado: [true],
    });
    this.formAct=this._fb.group({
      id: [0],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: [Date()],
      email: ['', [Validators.required, Validators.email]],
      numDoc: [0, Validators.required],
      area: [0],
      salario: [0],
      estado: [true],
    });
    this.cargando=true;
    this.areaService.cargarAreas().subscribe((resp: any) => {
      this.areas=resp.areas;
    });
    this.userService.cargarUsuarios().subscribe((resp: any) => {
      this.info=resp.usuarios;
      this.cargando=false;
      this.getUsuarios= true;
    });
  }
  getAreas(codigo: number|undefined){
    const filt=this.areas.filter(x=>x.codigo===codigo);
    return filt[0].Nombre;
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
      this.userService.crearUsuario(this.formAdd.value).subscribe((resp: any)=> {
        if(resp.ok===true){
          Swal.fire({
            title: resp.nombre,
            text: resp.msg,
            icon: 'success'

          });
        }
        this.userService.cargarUsuarios().subscribe((resp: any) => {
          this.info=resp.usuarios;
          this.cargando=false;
          this.getUsuarios= true;
        });
      })
  }
    form(user: Usuario){

    this.formAct.setValue({
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      fechaNacimiento:user.fechaNacimiento,
      email: user.email,
      numDoc: user.numDoc,
      area: user.area,
      salario: user.salario,
      estado: user.estado,
    });
    console.log(this.formAct.value)
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
      this.userService.actUsuario(this.formAct.value).subscribe((resp: any)=> {
        if(resp.ok===true){
          Swal.fire({
            title: resp.user.nombres,
            text: resp.msg,
            icon: 'success'

          });
        }
        this.userService.cargarUsuarios().subscribe((resp: any) => {
          this.info=resp.usuarios;
          this.cargando=false;
          this.getUsuarios= true;
        });
      })



  }

  borrarUsuario(user: Usuario|any, i: number){
    Swal.fire({
      title: '¿esta seguro?',
      text: 'desea borrar este Usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then(resp =>{
      if(resp.value){
        this.info.splice(i,1);
    this.userService.borrarUsuario(user.id).subscribe((resp:any) => {
      if(resp.ok===false) {
        Swal.fire(
          'Error',
          `${ resp.msg }`,
          'error'
        )
      }else {
        this.userService.cargarUsuarios().subscribe((resp: any) => {
          Swal.fire(
            'Usuario borrado',
            `El Usuario fue eliminado correctamente`,
            'success'
          );
          this.info=resp.usuarios;
          this.cargando=false;
          this.getUsuarios= true;
        });
      }

    });

      }
    });

  }


}
