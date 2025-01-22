import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskTypeModel } from '../../../models/taskType';
import { TaskTypeService } from '../../../services/api/task-type.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

@Component({
  selector: 'app-task-type-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButton,
    MatIcon,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './task-type-list.component.html',
  styleUrl: './task-type-list.component.css',
})
export class TaskTypeListComponent implements OnInit {
  taskTypes: TaskTypeModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'actions'];

  constructor(
    private taskTypeService: TaskTypeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTaskTypes();
  }

  getTaskTypes(): void {
    this.taskTypeService.getAllTaskTypes().subscribe({
      next: (taskTypes) => (this.taskTypes = taskTypes),
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
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
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      next: () => this.getTaskTypes(),
    });
  }
}
