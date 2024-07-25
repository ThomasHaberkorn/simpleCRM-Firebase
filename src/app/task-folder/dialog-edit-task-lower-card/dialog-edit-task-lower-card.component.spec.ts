import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTaskLowerCardComponent } from './dialog-edit-task-lower-card.component';

describe('DialogEditTaskLowerCardComponent', () => {
  let component: DialogEditTaskLowerCardComponent;
  let fixture: ComponentFixture<DialogEditTaskLowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditTaskLowerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditTaskLowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
