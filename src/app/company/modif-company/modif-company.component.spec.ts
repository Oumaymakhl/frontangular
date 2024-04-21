import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifCompanyComponent } from './modif-company.component';

describe('ModifCompanyComponent', () => {
  let component: ModifCompanyComponent;
  let fixture: ComponentFixture<ModifCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
