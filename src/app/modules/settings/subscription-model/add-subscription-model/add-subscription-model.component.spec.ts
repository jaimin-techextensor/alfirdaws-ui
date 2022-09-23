import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionModelComponent } from './add-subscription-model.component';

describe('AddSubscriptionModelComponent', () => {
  let component: AddSubscriptionModelComponent;
  let fixture: ComponentFixture<AddSubscriptionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscriptionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
