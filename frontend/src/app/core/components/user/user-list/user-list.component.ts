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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.cdr.markForCheck();
      },
      error: (error) => {
        if (error.message.match(/403/i)) this.router.navigate(['/login']);
      },
    });
  }

  addUser(): void {
    // Lógica para agregar un nuevo usuario
    console.log('Agregar nuevo usuario');
    this.router.navigate(['/users/create']);
  }

  showUser(id: number): void {
    // Lógica para mostrar un usuario
    console.log(`Mostrar usuario ${id}`);
    // Navegar a la ruta del usuario
    this.router.navigate(['/users', id]);
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers(); // Actualiza la lista después de eliminar
      });
    }
  }
}
