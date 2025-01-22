import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error-404',
    imports: [RouterLink, MatButtonModule],
    templateUrl: './error-404.component.html',
    styleUrl: './error-404.component.css'
})
export class Error404Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
