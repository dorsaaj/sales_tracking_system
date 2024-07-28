import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePersonUpdateComponent } from './sale-person-update.component';

describe('SalePersonUpdateComponent', () => {
  let component: SalePersonUpdateComponent;
  let fixture: ComponentFixture<SalePersonUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalePersonUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalePersonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
