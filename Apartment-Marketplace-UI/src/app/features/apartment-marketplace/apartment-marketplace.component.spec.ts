import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentMarketplaceComponent } from './apartment-marketplace.component';

describe('ApartmentMarketplaceComponent', () => {
  let component: ApartmentMarketplaceComponent;
  let fixture: ComponentFixture<ApartmentMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentMarketplaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
