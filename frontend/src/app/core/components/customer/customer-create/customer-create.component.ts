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
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { CustomerModel } from '../../../models/customer';
import { CollaboratorService } from '../../../services/collaborator/collaborator-service.service';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-customer-create',
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
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css',
})
export class CustomerCreateComponent implements OnInit {
  customer: any = {}; // Cambia el tipo según tu modelo
  customerForm: FormGroup;
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private collaboratorService: CollaboratorService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      ciudad: [''],
      estado: [''],
      pais: [''],
      fecha_nacimiento: [''],
      fecha_registro: [''],
      activo: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCollaborators();
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData: CustomerModel = {
        ...this.customerForm.value,
      };
      console.log('Datos del usuario:', customerData);
      this.customerService.createCustomer(customerData).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: (error) => console.error(error),
      });
    } else {
      console.log('El formulario no es válido');
    }
  }

  getCollaborators(): void {
    this.collaboratorService
      .getAllCollaborators()
      .subscribe((collaborators) => {
        this.collaborators = collaborators;
        this.cdr.markForCheck();
      });
  }

  isCollaborator(): boolean {
    return this.customerForm.get('rol')?.value === 'Colaborador';
  }

  goBack(): void {
    this.location.back();
  }
}
