// is-mobile.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Esto hace que el servicio sea global
})
export class IsMobileService {
  private isMobileSubject = new BehaviorSubject<boolean>(false); // Valor inicial

  // Observable para que otros componentes se suscriban
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {}

  // Método para actualizar el estado de 'isMobile'
  setIsMobile(value: boolean): void {
    this.isMobileSubject.next(value);
  }
}
