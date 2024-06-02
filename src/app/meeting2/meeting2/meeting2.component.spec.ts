import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meeting2Component } from './meeting2.component';

describe('Meeting2Component', () => {
  let component: Meeting2Component;
  let fixture: ComponentFixture<Meeting2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Meeting2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Meeting2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
