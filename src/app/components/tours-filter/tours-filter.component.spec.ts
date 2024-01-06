import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursFilterComponent } from './tours-filter.component';

describe('ToursFilterComponent', () => {
  let component: ToursFilterComponent;
  let fixture: ComponentFixture<ToursFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToursFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
