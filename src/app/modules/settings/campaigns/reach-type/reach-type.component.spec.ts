import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachTypeComponent } from './reach-type.component';

describe('ReachTypeComponent', () => {
  let component: ReachTypeComponent;
  let fixture: ComponentFixture<ReachTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReachTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
