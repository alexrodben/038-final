import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { CollaboratorService } from '../../../services/api/collaborator-service.service';
import { ProjectService } from '../../../services/api/project-service.service';

@Component({
    selector: 'app-project-edit',
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
    providers: [provideNativeDateAdapter()],
    templateUrl: './project-edit.component.html',
    styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  project: any = {}; // Cambia el tipo según tu modelo
  projectForm: FormGroup;
  projectId: string = '0';
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private collaboratorService: CollaboratorService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cliente_id: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_estimacion: ['', Validators.required],
      estado: ['', Validators.required],
      responsable_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '0'; // Obtiene el ID de la ruta
    if (this.projectId) {
      this.getCollaborators();
      this.getProject(this.projectId);
    }
  }

  getProject(id: string): void {
    this.projectService.getProjectById(id).subscribe((project) => {
      this.project = project;
      this.projectForm.patchValue({
        id: project.id,
        nombre: project.nombre,
        descripcion: project.descripcion,
        cliente_id: project.cliente_id,
        fecha_inicio: project.fecha_inicio,
        fecha_estimacion: project.fecha_estimacion,
        estado: project.estado,
        responsable_id: project.responsable_id,
      });
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService
        .updateProject(this.projectId, this.projectForm.value)
        .subscribe(() => {
          this.router.navigate(['/projects']);
        });
    } else {
      console.log('Formulario no válido');
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

  goBack(): void {
    this.location.back();
  }
}
