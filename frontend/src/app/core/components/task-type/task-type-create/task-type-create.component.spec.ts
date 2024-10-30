import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeCreateComponent } from './task-type-create.component';

describe('TaskTypeCreateComponent', () => {
  let component: TaskTypeCreateComponent;
  let fixture: ComponentFixture<TaskTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
