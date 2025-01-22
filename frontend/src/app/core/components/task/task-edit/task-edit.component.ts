import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { ProjectModel } from '../../../models/project';
import { TaskModel } from '../../../models/task';
import { TaskTypeModel } from '../../../models/taskType';
import { TaskService } from '../../../services/api/task.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatSelect,
    MatSelectModule,
    MatDatepicker,
    MatDatepickerModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  providers: [provideNativeDateAdapter()],
})
export class TaskEditComponent implements OnInit {
  button: string = 'Guardar';
  taskId: string = '';
  taskForm: FormGroup;
  create: boolean = true;
  title: string = '';

  // Listas
  projects: ProjectModel[] = [];
  taskTypes: TaskTypeModel[] = [];
  collaborators: CollaboratorModel[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_entrega: ['', Validators.required],
      estado: ['', Validators.required],
      prioridad: ['', Validators.required],
      horas_estimadas: ['', Validators.required],
      horas_registradas: ['', Validators.required],
      proyecto_id: ['', Validators.required],
      responsable_id: ['', Validators.required],
      tipo_tarea_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.collaborators = JSON.parse(
      localStorage.getItem('collaborators') || '[]'
    );
    this.taskTypes = JSON.parse(localStorage.getItem('taskTypes') || '[]');
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');

    this.taskId = this.route.snapshot.paramMap.get('id') || '0'; // Obtiene el ID de la ruta
    if (this.taskId == '0') {
      const segments = this.router.url.split('/'); // Divide la URL por '/'
      const currentRoute = segments[segments.length - 1]; // Último segmento de la ruta
      if (currentRoute === 'create') this.title = 'Crear tarea';
    } else {
      this.title = 'Mostrar / editar tarea';
      this.getTask(this.taskId);
      this.button = 'Actualizar';
      this.create = false;
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: TaskModel = {
        ...this.taskForm.value,
      };
      console.log('Datos del proyecto:', task);
      if (this.create) this.createTask(task);
      else this.updateTask(task);
    } else {
      console.error('Formulario inválido');
    }
  }

  goBack(): void {
    this.router.navigate(['/task-types']);
  }

  getTask(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe((task: TaskModel) => {
      this.taskForm.patchValue(task);
    });
  }

  createTask(task: TaskModel): void {
    this.taskService.createTask(task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
    });
  }

  updateTask(task: TaskModel): void {
    this.taskService.updateTask(this.taskId, task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
    });
  }
}
