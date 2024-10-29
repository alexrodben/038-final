import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  user: any = {}; // Cambia el tipo según tu modelo

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirige a la lista de usuarios
    });
  }
}
