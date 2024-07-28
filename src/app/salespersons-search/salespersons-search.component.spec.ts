import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonsSearchComponent } from './salespersons-search.component';

describe('SalespersonsSearchComponent', () => {
  let component: SalespersonsSearchComponent;
  let fixture: ComponentFixture<SalespersonsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalespersonsSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalespersonsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
