import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricingModelComponent } from './add-pricing-model.component';

describe('AddPricingModelComponent', () => {
  let component: AddPricingModelComponent;
  let fixture: ComponentFixture<AddPricingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPricingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPricingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
