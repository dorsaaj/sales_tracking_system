import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonsAddComponent } from './salespersons-add.component';

describe('SalespersonsAddComponent', () => {
  let component: SalespersonsAddComponent;
  let fixture: ComponentFixture<SalespersonsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalespersonsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
