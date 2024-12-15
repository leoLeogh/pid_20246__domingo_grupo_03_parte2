import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private _usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Inicialización del formulario con los campos necesarios
  initForm() {
    this.registroForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      apellido: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, [Validators.required]),
      telefono: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [Validators.required]),
      estado: new FormControl('ACTIVO', [Validators.required]),
      id_rol: new FormControl(2, [Validators.required]),  // rol por defecto
    });
  }

  // Función para enviar los datos del formulario
  onSubmit() {
    if (this.registroForm.valid) {
      const request = {
        ...this.registroForm.value,
        rol: {
          idRol: this.registroForm.value.id_rol,
        },
      };

      this._usuariosService.registrarUsuario(request).subscribe({
        next: (res) => {
          Swal.fire({
            title: '¡Registro Exitoso!',
            text: 'El usuario ha sido registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/login']); // Redirige al login después de un registro exitoso
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          console.error('Error al registrar usuario:', err);
        },
      });
    }
  }
}
