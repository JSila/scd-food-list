import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFiltersComponent } from './food-filters.component';

describe('FoodFiltersComponent', () => {
  let component: FoodFiltersComponent;
  let fixture: ComponentFixture<FoodFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
