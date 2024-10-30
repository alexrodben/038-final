import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user';
import { UserService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  user: any = {}; // Cambia el tipo según tu modelo
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
      colaborador_id: [null], // puedes ajustar el tipo según tu necesidad
    });
  }
  createUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirige a la lista de usuarios
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserModel = {
        id: 0, // Asigna un ID o manejar el ID en el backend
        ...this.userForm.value,
      };
      console.log('Datos del usuario:', userData);
      // Aquí puedes llamar a tu servicio para enviar los datos
    } else {
      console.log('El formulario no es válido');
    }
  }
}
