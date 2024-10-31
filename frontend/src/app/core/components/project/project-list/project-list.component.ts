import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectModel } from '../../../models/project';
import { ProjectService } from '../../../services/project/project-service.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  providers: [DatePipe], // Añade DatePipe a los providers aquí
})
export class ProjectListComponent {
  projects: ProjectModel[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'cliente',
    'fechaInicio',
    'actions',
  ];

  constructor(
    private datePipe: DatePipe,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.cdr.markForCheck();
      },
      error: (error) => {
        if (error.message.match(/403/i)) this.router.navigate(['/login']);
      },
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

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter((project) => project.id !== id);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting project', error);
      },
    });
  }
}
