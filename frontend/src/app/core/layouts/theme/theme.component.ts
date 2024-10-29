import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, RouterLink, MatSidenavModule, MatIcon],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {}
