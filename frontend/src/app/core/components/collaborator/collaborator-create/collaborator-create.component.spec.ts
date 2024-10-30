import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorCreateComponent } from './collaborator-create.component';

describe('CollaboratorCreateComponent', () => {
  let component: CollaboratorCreateComponent;
  let fixture: ComponentFixture<CollaboratorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
