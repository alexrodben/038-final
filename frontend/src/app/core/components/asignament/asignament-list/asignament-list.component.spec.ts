import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignamentListComponent } from './asignament-list.component';

describe('AsignamentListComponent', () => {
  let component: AsignamentListComponent;
  let fixture: ComponentFixture<AsignamentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignamentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
