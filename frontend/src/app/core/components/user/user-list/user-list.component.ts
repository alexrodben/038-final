import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserModel } from '../../../models/user';
import { UserService } from '../../../services/user/user-service.service';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatButton, MatIcon, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  users: UserModel[] = []; // Cambia el tipo según tu modelo
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions']; // Columnas a mostrar

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.cdr.markForCheck(); // Notifica a Angular que debe verificar cambios
    });
  }

  addUser(): void {
    // Lógica para agregar un nuevo usuario
    console.log('Agregar nuevo usuario');
  }

  editUser(id: number): void {
    // Lógica para editar el usuario con el ID dado
    console.log('Editar usuario con ID:', id);
    if (confirm('¿Estás seguro de que deseas editar este usuario?')) {
      this.userService.updateUser(id).subscribe(() => {
        this.getUsers(); // Actualiza la lista después de editar
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers(); // Actualiza la lista después de eliminar
      });
    }
  }
}
