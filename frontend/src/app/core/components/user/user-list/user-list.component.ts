import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Cambia el tipo según tu modelo

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers(); // Actualiza la lista después de eliminar
      });
    }
  }
}
