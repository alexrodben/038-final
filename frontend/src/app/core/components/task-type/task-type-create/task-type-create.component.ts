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
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskTypeModel } from '../../../models/taskType';
import { TaskTypeService } from '../../../services/taskType/task-type.service';

@Component({
  selector: 'app-task-type-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './task-type-create.component.html',
  styleUrl: './task-type-create.component.css',
})
export class TaskTypeCreateComponent implements OnInit {
  button: string = 'Guardar';
  taskTypeId: string = '';
  taskTypeForm: FormGroup;
  create: boolean = true;
  title: string = '';

  constructor(
    private taskTypeService: TaskTypeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.taskTypeForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskTypeId = this.route.snapshot.paramMap.get('id') || '0'; // Obtiene el ID de la ruta
    if (this.taskTypeId == '0') {
      const segments = this.router.url.split('/'); // Divide la URL por '/'
      const currentRoute = segments[segments.length - 1]; // Último segmento de la ruta
      if (currentRoute === 'create') this.title = 'Crear tipo de tarea';
    } else {
      this.title = 'Mostrar / editar tipo de tarea';
      this.getTaskType(this.taskTypeId);
      this.button = 'Actualizar';
      this.create = false;
    }
  }

  onSubmit(): void {
    if (this.taskTypeForm.valid) {
      const taskType: TaskTypeModel = {
        ...this.taskTypeForm.value,
      };
      console.log('Datos del proyecto:', taskType);
      if (this.create) this.createTaskType(taskType);
      else this.updateTaskType(taskType);
    } else {
      console.error('Formulario inválido');
    }
  }

  goBack(): void {
    this.router.navigate(['/task-types']);
  }

  getTaskType(id: string): void {
    this.taskTypeService.getTaskTypeById(id).subscribe((taskType) => {
      this.taskTypeForm.patchValue({
        id: taskType.id,
        nombre: taskType.nombre,
      });
    });
  }

  createTaskType(taskType: TaskTypeModel): void {
    this.taskTypeService.createTaskType(taskType).subscribe({
      next: () => this.router.navigate(['/task-types']),
      error: (error) => console.error(error),
    });
  }

  updateTaskType(taskType: TaskTypeModel): void {
    this.taskTypeService.updateTaskType(this.taskTypeId, taskType).subscribe({
      next: () => this.router.navigate(['/task-types']),
      error: (error) => console.error(error),
    });
  }
}
