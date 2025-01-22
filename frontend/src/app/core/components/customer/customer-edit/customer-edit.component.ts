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
import { CollaboratorModel } from '../../../models/collaborator';
import { CustomerModel } from '../../../models/customer';
import { CollaboratorService } from '../../../services/api/collaborator-service.service';
import { CustomerService } from '../../../services/api/customer.service';

@Component({
  selector: 'app-customer-edit',
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
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css',
})
export class CustomerEditComponent implements OnInit {
  customer: any = {}; // Cambia el tipo según tu modelo
  customerForm: FormGroup;
  customerId: string | null = null;
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private collaboratorService: CollaboratorService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
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
    this.customerId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    if (this.customerId) {
      this.getCollaborators();
      this.getCustomer(this.customerId);
    }
  }

  getCustomer(id: string): void {
    this.customerService.getCustomerById(id).subscribe((customer) => {
      this.customer = customer;
      this.customerForm.patchValue({
        id: customer.id,
        nombre: customer.nombre,
        apellido: customer.apellido,
        email: customer.email,
        telefono: customer.telefono,
        direccion: customer.direccion,
        ciudad: customer.ciudad,
        estado: customer.estado,
        pais: customer.pais,
        fecha_nacimiento: customer.fecha_nacimiento,
        fecha_registro: customer.fecha_registro,
        activo: customer.activo,
      });
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData: CustomerModel = {
        id: this.customerId,
        ...this.customerForm.value,
      };
      console.log('Datos del cliente:', customerData);
      this.customerService
        .updateCustomer(this.customerId ?? '0', customerData)
        .subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (error) => console.error(error),
        });
      // Aquí puedes llamar a tu servicio para enviar los datos
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
