import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importar Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Proveedor de rutas
    provideHttpClient(), // Proveedor de HttpClient
    provideAnimationsAsync(), // Proveedor de HttpClient
    MatFormFieldModule, // Agregar el módulo de MatFormField
    MatInputModule, // Agregar el módulo de MatInput
    BrowserAnimationsModule, // Importar BrowserAnimationsModule
    MatButtonModule, // Agregar el módulo de MatButton
    MatLabel, // Agregar el módulo de MatLabel
  ],
};
