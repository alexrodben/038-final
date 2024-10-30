import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCreateComponent } from './risk-create.component';

describe('RiskCreateComponent', () => {
  let component: RiskCreateComponent;
  let fixture: ComponentFixture<RiskCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
