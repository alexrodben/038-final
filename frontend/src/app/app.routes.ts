import { Routes } from '@angular/router';
import { AppComponent } from './core/components/app/app.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LoginComponent } from './core/components/login/login.component';
import { Error404Component } from './core/layouts/error-404/error-404.component';
import { ThemeComponent } from './core/layouts/theme/theme.component';
// Users
import { UserCreateComponent } from './core/components/user/user-create/user-create.component';
import { UserEditComponent } from './core/components/user/user-edit/user-edit.component';
import { UserListComponent } from './core/components/user/user-list/user-list.component';

export const routes: Routes = [
  // Aquí definiremos nuestras rutas
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ThemeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'app', component: AppComponent },
      // Users
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/:id', component: UserEditComponent },
      { path: 'users', component: UserListComponent },
    ],
  },
  { path: '**', component: Error404Component }, // Ruta wildcard para manejar 404
];
