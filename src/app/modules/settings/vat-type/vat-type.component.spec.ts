import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatTypeComponent } from './vat-type.component';

describe('VatTypeComponent', () => {
  let component: VatTypeComponent;
  let fixture: ComponentFixture<VatTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
