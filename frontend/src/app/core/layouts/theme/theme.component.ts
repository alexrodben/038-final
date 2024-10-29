import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // Asegúrate de tener importado el servicio AuthService

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    RouterLink,
    MatSidenavModule,
    MatIcon,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent implements OnInit {
  username: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.username = profile.username; // Ajusta a cómo devuelve el nombre el endpoint
        this.cdr.markForCheck(); // Notifica a Angular que debe verificar cambios
      },
      error: (error) => {
        console.error('Error al obtener el perfil', error);
      },
    });
  }
}
