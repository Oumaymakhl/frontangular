import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistique1Component } from './statistique1.component';

describe('Statistique1Component', () => {
  let component: Statistique1Component;
  let fixture: ComponentFixture<Statistique1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Statistique1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistique1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
