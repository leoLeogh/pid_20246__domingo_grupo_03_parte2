import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './components/helpers/auth.interceptor';
import { AuthGuard } from './components/helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './components/views/proyectos/proyectos.component';
import { RegistrarUsuariosComponent } from './components/auth/registro/registrar-usuarios.component';  // Importa el nuevo componente

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarUsuariosComponent,  // Declara el nuevo componente aquí
    HomeComponent, ProyectosComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent }, 
      { path: 'proyecto', component: ProyectosComponent, canActivate: [AuthGuard] },
      { path: 'registrar-usuarios', component: RegistrarUsuariosComponent },  // Actualiza la ruta para el nuevo componente
      { path: '', component: LoginComponent },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
