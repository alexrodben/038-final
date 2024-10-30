import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { CollaboratorService } from '../../../services/collaborator/collaborator-service.service';

@Component({
  selector: 'app-collaborator-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollaboratorListComponent implements OnInit {
  collaborator: CollaboratorModel[] = []; // Cambia el tipo según tu modelo
  displayedColumns: string[] = ['id', 'name', 'role', 'status', 'actions']; // Columnas a mostrar

  constructor(
    private collaboratorService: CollaboratorService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCollaborators();
  }

  getCollaborators(): void {
    this.collaboratorService.getAllCollaborators().subscribe({
      next: (collaborators) => {
        this.collaborator = collaborators;
        this.cdr.markForCheck();
      },
      error: (error) => {
        if (error.message.match(/403/i)) this.router.navigate(['/login']);
      },
    });
  }

  addCollaborator(): void {
    // Lógica para agregar un nuevo colaborador
    console.log('Agregar nuevo colaborador');
    this.router.navigate(['/collaborators/create']);
  }

  showCollaborator(id: number): void {
    // Lógica para mostrar un colaborador
    console.log(`Mostrar colaborador ${id}`);
    // Navegar a la ruta del colaborador
    this.router.navigate(['/collaborators', id]);
  }

  deleteCollaborator(id: string): void {
    // Lógica para eliminar un colaborador
    console.log(`Eliminar colaborador ${id}`);
    this.collaboratorService.deleteCollaborator(id).subscribe({
      next: () => {
        this.getCollaborators();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
