import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formRegister: FormGroup;
  isLoginMode: boolean = true; // Alternar entre login y registro

  constructor(
    private _loginService: LoginService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm() {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  initRegisterForm() {
    this.formRegister = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    if (this.formLogin.valid) {
      this._loginService.ingresar(this.formLogin.value)
        .subscribe({
          next: (res) => {
            console.log("Response: ", res);
            this.route.navigate(['/home']);
          },
          error: (err: HttpErrorResponse) => {
            this.alertaError("Correo o contraseña incorrecta");
          }
        });
    }
  }

  register() {
    if (this.formRegister.valid) {
      this._loginService.registrar(this.formRegister.value)
        .subscribe({
          next: (res) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registro exitoso",
              showConfirmButton: false,
              timer: 1500
            });
            this.isLoginMode = true; // Volver al modo de inicio de sesión
            this.formRegister.reset();
          },
          error: (err: HttpErrorResponse) => {
            this.alertaError("Error al registrarse. Intenta nuevamente.");
          }
        });
    }
  }

  alertaError(message: string) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
