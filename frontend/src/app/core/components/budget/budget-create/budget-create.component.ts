import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs

import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BudgetModel } from '../../../models/budget';
import { ProjectModel } from '../../../models/project';
import { BudgetService } from '../../../services/budget/budget.service';
import { ProjectService } from '../../../services/project/project-service.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

@Component({
  selector: 'app-budget-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './budget-create.component.html',
  styleUrl: './budget-create.component.css',
})
export class BudgetCreateComponent implements OnInit {
  budget: any = {}; // Cambia el tipo según tu modelo
  budgetForm: FormGroup;
  projects: ProjectModel[] = []; // Almacena la lista de proyectos

  constructor(
    private projectService: ProjectService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      proyecto_id: ['', Validators.required],
      presupuesto_estimado: ['', Validators.required],
      gastos_realizados: [0],
      gastos_pendientes: [0],
      variacion_presupuestaria: [0],
      moneda: ['USD', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProjects();
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

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budgetData: BudgetModel = {
        ...this.budgetForm.value,
      };
      console.log('Datos del presupuesto:', budgetData);
      this.budgetService.createBudget(budgetData).subscribe({
        next: () => this.router.navigate(['/budgets']),
        error: (error) => console.error(error),
      });
    } else {
      console.log('El formulario no es válido');
    }
  }

  isCollaborator(): boolean {
    return this.budgetForm.get('rol')?.value === 'Colaborador';
  }

  goBack(): void {
    this.location.back();
  }
}
