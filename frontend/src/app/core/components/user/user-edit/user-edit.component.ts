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
import { MatFormFieldModule } from '@angular/material/form-field'; // Para form-field
import { MatInputModule } from '@angular/material/input'; // Para inputs
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaboratorModel } from '../../../models/collaborator';
import { UserModel } from '../../../models/user';
import { CollaboratorService } from '../../../services/collaborator/collaborator-service.service';
import { UserService } from '../../../services/user/user-service.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  user: any = {}; // Cambia el tipo según tu modelo
  userForm: FormGroup;
  userId: string | null = null;
  collaborators: CollaboratorModel[] = []; // Almacena la lista de colaboradores

  constructor(
    private collaboratorService: CollaboratorService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required],
      colaborador_id: [null], // puedes ajustar el tipo según tu necesidad
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la ruta
    if (this.userId) {
      this.getCollaborators();
      this.getUser(this.userId);
    }
  }

  getUser(id: string): void {
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
      this.userForm.patchValue({
        id: user.id,
        username: user.username,
        password: '****', // para mostrar el campo enmascarado
        rol: user.rol,
        estado: user.estado,
        colaborador_id: user.colaborador_id || null, // ajusta según los datos de tu modelo
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: UserModel = {
        id: this.userId,
        ...this.userForm.value,
      };
      console.log('Datos del usuario:', userData);
      this.userService.updateUser(userData).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => console.error(error),
      });
      // Aquí puedes llamar a tu servicio para enviar los datos
    } else {
      console.log('El formulario no es válido');
    }
  }

  getCollaborators(): void {
    console.log('Obteniendo colaboradores');
    this.collaboratorService
      .getAllCollaborators()
      .subscribe((collaborators) => {
        this.collaborators = collaborators;
        this.cdr.markForCheck();
      });
  }

  isCollaborator(): boolean {
    return this.userForm.get('rol')?.value === 'Colaborador';
  }

  goBack(): void {
    this.location.back();
  }
}
