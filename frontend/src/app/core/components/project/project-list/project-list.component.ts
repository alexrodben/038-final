import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectModel } from '../../../models/project';
import { ProjectService } from '../../../services/project/project-service.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  providers: [DatePipe], // Añade DatePipe a los providers aquí
})
export class ProjectListComponent implements OnInit {
  projects: ProjectModel[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'cliente',
    'fecha_inicio',
    'actions',
  ];

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe({
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      next: (projects) => (this.projects = projects),
      complete: () => this.cdr.markForCheck(),
    });
  }

  addProject(): void {
    console.log('Agregar nuevo proyecto');
    this.router.navigate(['/projects/create']);
  }

  showProject(id: number): void {
    console.log(`Mostrar proyecto ${id}`);
    this.router.navigate(['/projects', id]);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: () =>
        (this.projects = this.projects.filter((project) => project.id !== id)),
      error: (error) => console.error('Error deleting project', error),
    });
  }
}
