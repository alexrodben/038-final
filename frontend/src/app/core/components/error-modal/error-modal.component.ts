import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
})
export class ErrorModalComponent {
  @Input() errorMessage: string = '';
  @Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose() {
    if (this.errorMessage.includes('403')) {
      this.router.navigate(['/login']); // Redirige a /login si el error contiene 403
    } else {
      this.closeModal.emit(); // Cierra el modal en otros casos
    }
  }
}
