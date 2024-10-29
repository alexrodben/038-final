import { Routes } from '@angular/router';
import { AppComponent } from './core/components/app/app.component';
import { LoginComponent } from './core/components/login/login.component';

export const routes: Routes = [
  // Aquí definiremos nuestras rutas
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: 'login' },
];
