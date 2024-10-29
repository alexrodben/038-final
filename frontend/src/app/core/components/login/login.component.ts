import { CommonModule } from '@angular/common'; // Importar CommonModule
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
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ], // Importar módulos de Material y CommonModule
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null; // Para almacenar el mensaje de error

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.errorMessage = null; // Reiniciar el mensaje de error al enviar el formulario

    // Validar que los campos no estén vacíos
    if (!this.username || !this.password) {
      this.errorMessage = 'Los campos de usuario y contraseña son requeridos.';
      return; // Salir si hay campos vacíos
    }

    const credentials: LoginCredentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe(
      (data) => {
        // Manejar la respuesta exitosa del servidor
        console.log('Inicio de sesión exitoso:', data);
        // Redirigir o realizar otra acción
      },
      (error) => {
        // Manejar errores
        console.error('Error al iniciar sesión:', error);
        this.errorMessage =
          'Error al iniciar sesión. Verifica tus credenciales y vuelve a intentarlo.'; // Mensaje de error de API
      }
    );
  }
}
