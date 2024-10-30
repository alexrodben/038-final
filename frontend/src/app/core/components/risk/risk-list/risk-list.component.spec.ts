import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskListComponent } from './risk-list.component';

describe('RiskListComponent', () => {
  let component: RiskListComponent;
  let fixture: ComponentFixture<RiskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
