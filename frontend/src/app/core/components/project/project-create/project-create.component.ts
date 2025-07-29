import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { ProjectModel } from '../../../models/project';
import { CollaboratorService } from '../../../services/api/collaborator-service.service';
import { ProjectService } from '../../../services/api/project-service.service';

@Component({
  selector: 'app-project-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepicker,
    MatDatepickerModule,
  ],
  standalone: true,
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ProjectCreateComponent implements OnInit {
  project: any = {}; // Cambia el tipo según tu modelo
  projectForm: FormGroup;
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private collaboratorService: CollaboratorService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cliente: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_estimacion: ['', Validators.required],
      estado: ['', Validators.required],
      responsable_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCollaborators();
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

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData: ProjectModel = {
        ...this.projectForm.value,
      };
      console.log('Datos del proyecto:', projectData);
      this.projectService.createProject(projectData).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (error) => console.error(error),
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
