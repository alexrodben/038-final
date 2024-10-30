import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignamentEditComponent } from './asignament-edit.component';

describe('AsignamentEditComponent', () => {
  let component: AsignamentEditComponent;
  let fixture: ComponentFixture<AsignamentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignamentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignamentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
