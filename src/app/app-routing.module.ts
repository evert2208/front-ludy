import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AreasComponent } from './pages/areas/areas.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'areas', component: AreasComponent},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
