import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatCoreComponent } from './combat-core.component';

describe('CombatCoreComponent', () => {
  let component: CombatCoreComponent;
  let fixture: ComponentFixture<CombatCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombatCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
