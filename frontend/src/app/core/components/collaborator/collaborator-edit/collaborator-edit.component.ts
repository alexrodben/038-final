import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { CollaboratorService } from '../../../services/collaborator/collaborator-service.service';

@Component({
  selector: 'app-collaborator-edit',
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
  templateUrl: './collaborator-edit.component.html',
  styleUrl: './collaborator-edit.component.css',
})
export class CollaboratorEditComponent {
  collaborator: any = {}; // Cambia el tipo según tu modelo
  collaboratorForm: FormGroup;
  userId: string | null = null;

  constructor(
    private collaboratorService: CollaboratorService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
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

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    if (this.userId) {
      this.getCollaborator(this.userId);
    }
  }

  getCollaborator(id: string): void {
    this.collaboratorService.getCollaboratorById(id).subscribe({
      next: (collaborator: CollaboratorModel) => {
        this.collaborator = collaborator;
        this.collaboratorForm.patchValue(collaborator);
      },
    });
  }

  onSubmit(): void {
    if (this.collaboratorForm.valid) {
      const collaboratorData: CollaboratorModel = {
        id: this.collaborator.id,
        ...this.collaboratorForm.value,
      };
      console.log('Datos del colaborador: ', collaboratorData);
      this.collaboratorService.updateCollaborator(collaboratorData).subscribe({
        next: () => this.router.navigate(['/collaborator']),
        error: (error) => console.log(error),
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
