import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionAdminComponent } from './decision-admin.component';

describe('DecisionAdminComponent', () => {
  let component: DecisionAdminComponent;
  let fixture: ComponentFixture<DecisionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
