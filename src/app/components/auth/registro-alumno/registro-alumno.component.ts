import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.css']
})
export class RegistroAlumnoComponent implements OnInit {

  formAlumno: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initAlumnoForm();
  }

  initAlumnoForm() {
    this.formAlumno = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      apellido: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      edad: new FormControl(null, [Validators.required, Validators.min(1)]),
      curso: new FormControl(null, [Validators.required]),
    });
  }

  registrarAlumno() {
    if (this.formAlumno.valid) {
      console.log("Datos del alumno:", this.formAlumno.value);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Alumno registrado con éxito",
        showConfirmButton: false,
        timer: 1500
      });

      this.formAlumno.reset();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Por favor completa todos los campos correctamente",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
