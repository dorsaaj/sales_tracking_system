import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionComponent } from './commision.component';

describe('CommisionComponent', () => {
  let component: CommisionComponent;
  let fixture: ComponentFixture<CommisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
