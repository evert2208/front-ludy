import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import {map, delay} from 'rxjs/operators';
import { Usuario} from '../models/usuarios.model';
import { Observable } from 'rxjs';
import { Area } from '../models/areas.model';

const base_url = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  cargarUsuarios(): Observable<Usuario[]> {
    const url=`${base_url}/auth`;
    return this.http.get<any[]>(url)
  }



  crearUsuario(user: Usuario){
    const url=`${base_url}/auth/new`;
    return this.http.post<any[]>(url, user);
  }

  actUsuario(user: Usuario){
    const url=`${base_url}/auth/${user.id}`;
    return this.http.put(url,user);
  }

  borrarUsuario(id: string){
    const url=`${base_url}/auth/${id}`;
    return this.http.delete(url);
  }


}
