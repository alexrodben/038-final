import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { UserModel } from '../../../models/user';
import { CollaboratorService } from '../../../services/collaborator/collaborator-service.service';
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
    MatSelectModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  user: any = {}; // Cambia el tipo según tu modelo
  userForm: FormGroup;
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private collaboratorService: CollaboratorService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
      colaborador_id: [null], // puedes ajustar el tipo según tu necesidad
    });
  }

  ngOnInit(): void {
    this.getCollaborators();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserModel = {
        ...this.userForm.value,
      };
      console.log('Datos del usuario:', userData);
      this.userService.createUser(userData).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (error) => console.error(error),
      });
    } else {
      console.log('El formulario no es válido');
    }
  }

  getCollaborators(): void {
    console.log('Obteniendo colaboradores');
    this.collaboratorService
      .getAllCollaborators()
      .subscribe((collaborators) => {
        this.collaborators = collaborators;
        this.cdr.markForCheck();
      });
  }

  isCollaborator(): boolean {
    return this.userForm.get('rol')?.value === 'Colaborador';
  }
}
