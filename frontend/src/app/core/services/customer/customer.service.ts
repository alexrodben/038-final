import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerModel } from '../../models/customer';
import { HttpService } from '../http.services';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends HttpService {
  private baseUrl = `api/customers`;

  private transformToCustomer(data: any): CustomerModel {
    return {
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      direccion: data.direccion,
      ciudad: data.ciudad,
      estado: data.estado,
      pais: data.pais,
      fecha_nacimiento: data.fecha_nacimiento,
      fecha_registro: data.fecha_registro,
      activo: data.activo,
    };
  }

  private mapCustomers(customerData: any[]): CustomerModel[] {
    return customerData.map(this.transformToCustomer);
  }

  getAllCustomers(): Observable<CustomerModel[]> {
    return this.get<CustomerModel[]>(this.baseUrl).pipe(
      map((data: any[]) => this.mapCustomers(data))
    );
  }

  getCustomerById(id: string): Observable<CustomerModel> {
    return this.get<CustomerModel>(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => this.transformToCustomer(data))
    );
  }

  createCustomer(customer: CustomerModel): Observable<any> {
    return this.post<CustomerModel>(this.baseUrl, customer);
  }

  updateCustomer(id: string, customer: CustomerModel): Observable<any> {
    return this.put<CustomerModel>(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.delete<CustomerModel>(`${this.baseUrl}/${id}`);
  }
}
