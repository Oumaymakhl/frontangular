import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDecisionComponent } from './ajout-decision.component';

describe('AjoutDecisionComponent', () => {
  let component: AjoutDecisionComponent;
  let fixture: ComponentFixture<AjoutDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
