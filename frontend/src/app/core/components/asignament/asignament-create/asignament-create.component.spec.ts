import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignamentCreateComponent } from './asignament-create.component';

describe('AsignamentCreateComponent', () => {
  let component: AsignamentCreateComponent;
  let fixture: ComponentFixture<AsignamentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignamentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignamentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
