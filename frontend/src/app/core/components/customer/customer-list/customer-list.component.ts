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
import { CustomerModel } from '../../../models/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent implements OnInit {
  customers: CustomerModel[] = []; // Cambia el tipo según tu modelo
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions']; // Columnas a mostrar

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.cdr.markForCheck();
      },
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
    });
  }

  addCustomer(): void {
    // Lógica para agregar un nuevo usuario
    console.log('Agregar nuevo usuario');
    this.router.navigate(['/customers/create']);
  }

  showCustomer(id: number): void {
    // Lógica para mostrar un usuario
    console.log(`Mostrar usuario ${id}`);
    // Navegar a la ruta del usuario
    this.router.navigate(['/customers', id]);
  }

  deleteCustomer(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.getCustomers(); // Actualiza la lista después de eliminar
      });
    }
  }
}
