import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidActionCodeModalComponent } from './invalid-action-code-modal.component';

describe('InvalidActionCodeModalComponent', () => {
  let component: InvalidActionCodeModalComponent;
  let fixture: ComponentFixture<InvalidActionCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidActionCodeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidActionCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
