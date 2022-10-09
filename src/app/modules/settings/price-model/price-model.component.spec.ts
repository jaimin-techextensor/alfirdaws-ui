import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceModelComponent } from './price-model.component';

describe('PriceModelComponent', () => {
  let component: PriceModelComponent;
  let fixture: ComponentFixture<PriceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
