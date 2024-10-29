import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  user: any = {}; // Cambia el tipo según tu modelo
  //  id: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.id = +this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    //this.getUser(this.id);
  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']); // Redirige a la lista de usuarios
    });
  }
}
