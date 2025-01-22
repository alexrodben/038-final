import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { ProjectModel } from '../../../models/project';
import { TaskModel } from '../../../models/task';
import { TaskTypeModel } from '../../../models/taskType';
import { CollaboratorService } from '../../../services/api/collaborator-service.service';
import { ProjectService } from '../../../services/api/project-service.service';
import { TaskTypeService } from '../../../services/api/task-type.service';
import { TaskService } from '../../../services/api/task.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers: [DatePipe], // Añade DatePipe a los providers aquí
})
export class TaskListComponent implements OnInit {
  tasks: TaskModel[] = [];
  projects: ProjectModel[] = [];
  taskTypes: TaskTypeModel[] = [];
  collaborators: CollaboratorModel[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'fecha_inicio',
    'estado',
    'prioridad',
    'proyecto_id',
    'responsable_id',
    'tipo_tarea_id',
    'actions',
  ];

  constructor(
    private collaboratorService: CollaboratorService,
    private taskTypeService: TaskTypeService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCollaborators();
    this.getTaskTypes();
    this.getProjects();
    this.getTasks();
  }

  getCollaborators(): void {
    this.collaboratorService.getAllCollaborators().subscribe({
      next: (collaborators) => (this.collaborators = collaborators),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      complete: () => this.setItems(),
    });
  }

  getTaskTypes(): void {
    this.taskTypeService.getAllTaskTypes().subscribe({
      next: (taskTypes) => (this.taskTypes = taskTypes),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      complete: () => this.setItems(),
    });
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => (this.projects = projects),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      complete: () => this.setItems(),
    });
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      complete: () => this.setItems(),
    });
  }

  setItems(): void {
    localStorage.setItem('collaborators', JSON.stringify(this.collaborators));
    localStorage.setItem('taskTypes', JSON.stringify(this.taskTypes));
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.cdr.markForCheck();
  }

  addTask(): void {
    console.log('Agregar nueva tarea');
    this.router.navigate(['/tasks/create']);
  }

  showTask(id: number): void {
    console.log(`Mostrar tarea ${id}`);
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number): void {
    console.log(`Editar tarea ${id}`);
    this.router.navigate(['/tasks', id, 'edit']);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      next: () => this.getTasks(),
    });
  }

  // Función para obtener el nombre del tipo de tarea
  getTaskTypeName(id: number): string {
    const taskType = this.taskTypes.find((type) => type.id === id);
    return taskType ? taskType.nombre : 'Desconocido'; // Retorna 'Desconocido' si no se encuentra
  }

  // Función para obtener el nombre del proyecto
  getProjectName(id: number): string {
    const project = this.projects.find((p) => p.id === id);
    return project ? project.nombre : 'Desconocido'; // Retorna 'Desconocido' si no se encuentra
  }

  // Función para obtener el nombre del colaborador
  getCollaboratorName(id: number): string {
    const collaborator = this.collaborators.find((c) => c.id === id);
    return collaborator ? collaborator.nombre_completo : 'Desconocido'; // Retorna 'Desconocido' si no se encuentra
  }
}
