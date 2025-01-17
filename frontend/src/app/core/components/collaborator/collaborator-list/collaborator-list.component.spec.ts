import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorListComponent } from './collaborator-list.component';

describe('CollaboratorListComponent', () => {
  let component: CollaboratorListComponent;
  let fixture: ComponentFixture<CollaboratorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
