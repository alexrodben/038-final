import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { BudgetModel } from '../../../models/budget';
import { ProjectModel } from '../../../models/project';
import { BudgetService } from '../../../services/budget/budget.service';
import { ProjectService } from '../../../services/project/project-service.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';
@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetListComponent implements OnInit {
  budgets: BudgetModel[] = []; // Cambia el tipo según tu modelo
  projects: ProjectModel[] = []; // Almacena la lista de proyectos
  displayedColumns: string[] = [
    'id',
    'proyecto',
    'presupuesto_estimado',
    'actions',
  ]; // Columnas a mostrar

  constructor(
    private projectService: ProjectService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBudgets();
    this.getProjects();
  }

  getBudgets(): void {
    this.budgetService.getAllBudgets().subscribe({
      next: (budgets) => {
        this.budgets = budgets;
        this.cdr.markForCheck();
      },
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
    });
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.cdr.markForCheck();
      },
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
    });
  }

  addBudget(): void {
    // Lógica para agregar un nuevo presupuesto
    console.log('Agregar nuevo presupuesto');
    this.router.navigate(['/budgets/create']);
  }

  showBudget(id: number): void {
    // Lógica para mostrar un presupuesto
    console.log(`Mostrar presupuesto ${id}`);
    // Navegar a la ruta del presupuesto
    this.router.navigate(['/budgets', id]);
  }

  deleteBudget(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este presupuesto?')) {
      this.budgetService.deleteBudget(id).subscribe(() => {
        this.getBudgets(); // Actualiza la lista después de eliminar
      });
    }
  }

  findProjectName(id: number): string {
    return this.projects.find((project) => project.id === id)?.nombre || '';
  }
}
