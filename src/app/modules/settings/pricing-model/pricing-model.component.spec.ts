import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingModelComponent } from './pricing-model.component';

describe('PriceModelComponent', () => {
  let component: PricingModelComponent;
  let fixture: ComponentFixture<PricingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
