import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Aplicación Angular';

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí puedes realizar inicializaciones si es necesario.
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegistro() {
    this.router.navigate(['/registro-alumno']);
  }
}
