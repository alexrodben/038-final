import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TemplateComponent } from './app/core/layouts/template/template.component';

bootstrapApplication(TemplateComponent, appConfig).catch((err) =>
  console.error(err)
);
