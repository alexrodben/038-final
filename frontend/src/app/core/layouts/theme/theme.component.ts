import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';
import { AuthService } from '../../services/api/auth.service'; // Asegúrate de tener importado el servicio AuthService

@Component({
    selector: 'app-theme',
    imports: [
        MatButtonModule,
        RouterOutlet,
        MatToolbar,
        RouterLink,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        RouterLinkActive,
        MatMenuModule,
        CommonModule,
    ],
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent implements OnInit {
  private mediaQueryListener: (() => void) | any;
  username: string | null = null;
  isMobile: boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    const mediaQuery = this.media.matchMedia('(max-width: 600px)');
    this.isMobile = mediaQuery.matches;
    this.mediaQueryListener = () => {
      this.isMobile = mediaQuery.matches;
      this.cdr.markForCheck();
    };
    mediaQuery.addListener(this.mediaQueryListener);

    this.authService.getProfile().subscribe({
      error: (error) => this.dialog.open(ErrorModalComponent, { data: error }),
      next: (profile) => {
        this.username = profile.username; // Ajusta a cómo devuelve el nombre el endpoint
        this.cdr.markForCheck(); // Notifica a Angular que debe verificar cambios
      },
    });
  }

  ngOnDestroy() {
    // Limpieza: eliminar el listener al destruir el componente
    const mediaQuery = this.media.matchMedia('(max-width: 600px)');
    mediaQuery.removeListener(this.mediaQueryListener);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Asegúrate de tener importado el módulo de router
  }
}
