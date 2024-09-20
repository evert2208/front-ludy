import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AreasComponent } from './pages/areas/areas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AreasComponent,
    UsuariosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
