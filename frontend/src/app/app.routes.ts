import { Routes } from '@angular/router';
import { AppComponent } from './core/components/app/app.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { Error404Component } from './core/layouts/error-404/error-404.component';
import { LoginComponent } from './core/layouts/login/login.component';
import { ThemeComponent } from './core/layouts/theme/theme.component';
// Users
import { UserCreateComponent } from './core/components/user/user-create/user-create.component';
import { UserEditComponent } from './core/components/user/user-edit/user-edit.component';
import { UserListComponent } from './core/components/user/user-list/user-list.component';
// Colaboradores
import { CollaboratorCreateComponent } from './core/components/collaborator/collaborator-create/collaborator-create.component';
import { CollaboratorEditComponent } from './core/components/collaborator/collaborator-edit/collaborator-edit.component';
import { CollaboratorListComponent } from './core/components/collaborator/collaborator-list/collaborator-list.component';
// Projects
import { ProjectCreateComponent } from './core/components/project/project-create/project-create.component';
import { ProjectEditComponent } from './core/components/project/project-edit/project-edit.component';
import { ProjectListComponent } from './core/components/project/project-list/project-list.component';
// Tasks
import { TaskCreateComponent } from './core/components/task/task-create/task-create.component';
import { TaskEditComponent } from './core/components/task/task-edit/task-edit.component';
import { TaskListComponent } from './core/components/task/task-list/task-list.component';
// Task Types
import { TaskTypeCreateComponent } from './core/components/task-type/task-type-create/task-type-create.component';
import { TaskTypeEditComponent } from './core/components/task-type/task-type-edit/task-type-edit.component';
import { TaskTypeListComponent } from './core/components/task-type/task-type-list/task-type-list.component';
// Budgets
import { BudgetCreateComponent } from './core/components/budget/budget-create/budget-create.component';
import { BudgetEditComponent } from './core/components/budget/budget-edit/budget-edit.component';
import { BudgetListComponent } from './core/components/budget/budget-list/budget-list.component';

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
      // Colaboradores
      { path: 'collaborator/create', component: CollaboratorCreateComponent },
      { path: 'collaborator/:id', component: CollaboratorEditComponent },
      { path: 'collaborator', component: CollaboratorListComponent },
      // Projects
      { path: 'projects/create', component: ProjectCreateComponent },
      { path: 'projects/:id', component: ProjectEditComponent },
      { path: 'projects', component: ProjectListComponent },
      // Tasks
      { path: 'tasks/create', component: TaskCreateComponent },
      { path: 'tasks/:id', component: TaskEditComponent },
      { path: 'tasks', component: TaskListComponent },
      // Task Types
      { path: 'task-types/create', component: TaskTypeCreateComponent },
      { path: 'task-types/:id', component: TaskTypeEditComponent },
      { path: 'task-types', component: TaskTypeListComponent },
      // Budgets
      { path: 'budgets/create', component: BudgetCreateComponent },
      { path: 'budgets/:id', component: BudgetEditComponent },
      { path: 'budgets', component: BudgetListComponent },
    ],
  },
  { path: '**', component: Error404Component }, // Ruta wildcard para manejar 404
];
