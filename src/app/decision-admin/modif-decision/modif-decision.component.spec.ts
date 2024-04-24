import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifDecisionComponent } from './modif-decision.component';

describe('ModifDecisionComponent', () => {
  let component: ModifDecisionComponent;
  let fixture: ComponentFixture<ModifDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
