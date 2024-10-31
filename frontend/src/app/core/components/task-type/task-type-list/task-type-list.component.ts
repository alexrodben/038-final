import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskTypeModel } from '../../../models/taskType';
import { TaskTypeService } from '../../../services/taskType/task-type.service';

@Component({
  selector: 'app-task-type-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule, CommonModule],
  templateUrl: './task-type-list.component.html',
  styleUrl: './task-type-list.component.css',
})
export class TaskTypeListComponent implements OnInit {
  taskTypes: TaskTypeModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'actions'];

  constructor(
    private taskTypeService: TaskTypeService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTaskTypes();
  }

  getTaskTypes(): void {
    this.taskTypeService.getAllTaskTypes().subscribe({
      next: (taskTypes) => (this.taskTypes = taskTypes),
      error: (error) => console.log('Error getting task types', error),
      complete: () => this.cdr.markForCheck(),
    });
  }

  addTaskType(): void {
    console.log('Agregar nuevo tipo de tarea');
    this.router.navigate(['/task-types/create']);
  }

  showTaskType(id: number): void {
    console.log(`Mostrar tipo de tarea ${id}`);
    this.router.navigate(['/task-types', id]);
  }

  editTaskType(id: number): void {
    console.log(`Editar tipo de tarea ${id}`);
    this.router.navigate(['/task-types', id, 'edit']);
  }

  deleteTaskType(id: string): void {
    this.taskTypeService.deleteTaskType(id).subscribe({
      next: () => this.getTaskTypes(),
      error: (error) => console.error(error),
    });
  }
}
