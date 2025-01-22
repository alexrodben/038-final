import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Para botones
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetModel } from '../../../models/budget';
import { ProjectModel } from '../../../models/project';
import { BudgetService } from '../../../services/api/budget.service';
import { ProjectService } from '../../../services/api/project-service.service';

@Component({
  selector: 'app-budget-edit',
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
  templateUrl: './budget-edit.component.html',
  styleUrl: './budget-edit.component.css',
})
export class BudgetEditComponent implements OnInit {
  budget: any = {}; // Cambia el tipo según tu modelo
  budgetForm: FormGroup;
  budgetId: string | null = null;
  project: ProjectModel = {
    nombre: '',
    descripcion: '',
    cliente_id: 0,
    fecha_inicio: new Date(),
    fecha_estimacion: new Date(),
    estado: 'En Planificación',
    responsable_id: 0,
  };

  constructor(
    private projectService: ProjectService,
    private budgetService: BudgetService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      nombre: [''],
      proyecto_id: ['', Validators.required],
      presupuesto_estimado: ['', Validators.required],
      gastos_realizados: [''],
      gastos_pendientes: [''],
      variacion_presupuestaria: [''],
      moneda: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.budgetId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    if (this.budgetId) {
      this.getProject(this.budgetId);
      this.getBudget(this.budgetId);
    }
  }

  getBudget(id: string): void {
    this.budgetService.getBudgetById(id).subscribe((budget) => {
      this.budget = budget;
      this.budgetForm.patchValue({
        id: budget.id,
        proyecto_id: budget.proyecto_id,
        presupuesto_estimado: budget.presupuesto_estimado,
        gastos_realizados: budget.gastos_realizados,
        gastos_pendientes: budget.gastos_pendientes,
        variacion_presupuestaria: budget.variacion_presupuestaria,
        moneda: budget.moneda,
      });
    });
  }

  getProject(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project) => (this.project = project),
      complete: () => {
        this.budgetForm.patchValue({
          nombre: this.project.nombre,
          proyecto_id: this.project.id,
        });
        this.cdr.markForCheck();
      },
      error: (error) => console.error(error),
    });
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      const budgetData: BudgetModel = {
        id: this.budgetId,
        ...this.budgetForm.value,
      };
      console.log('Datos del usuario:', budgetData);
      this.budgetService
        .updateBudget(this.budgetId ?? '0', budgetData)
        .subscribe({
          next: () => {
            this.router.navigate(['/budgets']);
          },
          error: (error) => console.error(error),
        });
      // Aquí puedes llamar a tu servicio para enviar los datos
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
