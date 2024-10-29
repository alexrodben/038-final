import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { MatButtonModule } from '@angular/material/button'; // Módulo para botones de Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Módulo para mat-form-field
import { MatInputModule } from '@angular/material/input'; // Módulo para matInput
import {
  AuthService,
  LoginCredentials,
} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de que sea standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule], // Importar módulos de Material
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const credentials: LoginCredentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe(
      (data) => {
        // Manejar la respuesta exitosa del servidor
        console.log('Inicio de sesión exitoso:', data);
      },
      (error) => {
        // Manejar errores
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
