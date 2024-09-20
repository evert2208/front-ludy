import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { map, delay } from 'rxjs/operators';
import { Area } from '../models/areas.model';
import { Observable } from 'rxjs';

const base_url = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  cargarAreas(): Observable<Area[]> {
    const url=`${base_url}/areas`;
    return this.http.get<any[]>(url)

  }



  crearArea(area: Area){
    const url=`${base_url}/areas`;
    return this.http.post<any[]>(url, area);
  }

  actArea(area: Area){
    const url=`${base_url}/areas/${area.id}`;
    return this.http.put(url,area);
  }

  borrarArea(id: string){
    const url=`${base_url}/areas/${id}`;
    return this.http.delete(url);
  }

}
