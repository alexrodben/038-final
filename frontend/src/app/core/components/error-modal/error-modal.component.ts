import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatIconModule,
  ], // Importar los módulos necesarios
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModalComponent {
  errorMessage: string = 'Error inesperado.';
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public errorData: any
  ) {
    // Procesa el mensaje del error si existe
    console.warn('Error data:', typeof errorData, errorData);
    this.errorMessage = (
      errorData?.message ||
      errorData?.error?.message ||
      this.errorMessage
    ).toUpperCase();
  }

  onClose() {
    if (this.errorMessage.includes('403')) {
      this.router.navigate(['/login']); // Redirige a /login si el error contiene 403
    }
    this.dialogRef.close(); // Cierra el modal en otros casos
  }
}
