import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { CollaboratorService } from '../../../services/api/collaborator-service.service';

@Component({
    selector: 'app-collaborator-create',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
    ],
    templateUrl: './collaborator-create.component.html',
    styleUrl: './collaborator-create.component.css'
})
export class CollaboratorCreateComponent {
  collaborator: any = {}; // Cambia el tipo según tu modelo
  collaboratorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private router: Router
  ) {
    this.collaboratorForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      rol: ['', Validators.required],
      email: ['', Validators.required],
      telefono: [null],
      estado: ['', Validators.required],
      horas_semanales: [null],
    });
  }

  onSubmit(): void {
    if (this.collaboratorForm.valid) {
      const collaboratorData: CollaboratorModel = {
        id: 0, // Asigna un ID o manejar el ID en el backend
        ...this.collaboratorForm.value,
      };
      console.log('Datos del colaborador: ', collaboratorData);
      this.collaboratorService.createCollaborator(collaboratorData).subscribe({
        next: () => this.router.navigate(['/collaborator']),
        error: (error) => console.log(error),
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
