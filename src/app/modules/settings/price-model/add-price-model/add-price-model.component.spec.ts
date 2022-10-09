import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceModelComponent } from './add-price-model.component';

describe('AddPriceModelComponent', () => {
  let component: AddPriceModelComponent;
  let fixture: ComponentFixture<AddPriceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPriceModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
