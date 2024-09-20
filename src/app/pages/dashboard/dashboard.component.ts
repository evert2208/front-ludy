import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/areas.model';
import { Usuario } from 'src/app/models/usuarios.model';
import { AreasService } from '../../services/areas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: any[]=[];
  data:Area[]=[];
  infouser: Usuario[]=[];
  datauser: Usuario[]=[];
  cont: number | any;
  contInacy: number | any;
  contuser: number | any;
  contInacyuser: number | any;

  constructor(private areaService: AreasService,
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {

    this.areaService.cargarAreas().subscribe((resp: any) => {
      this.info=resp.areas;
      const filtro=this.info.filter(resp => resp.estado===true);
      this.data=filtro;
       this.cont= this.data.length;
       this.contInacy= this.info.length-this.cont;

    });

    this.usuarioService.cargarUsuarios().subscribe((resp:any) => {
      this.infouser=resp.usuarios;


      const filtro=this.infouser.filter(resp => resp.estado===true);
      this.datauser=filtro;
       this.contuser= this.datauser.length;

       this.contInacyuser= this.infouser.length-this.contuser;

    });
  }

}
