import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionModelComponent } from './subscription-model.component';

describe('SubscriptionModelComponent', () => {
  let component: SubscriptionModelComponent;
  let fixture: ComponentFixture<SubscriptionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
