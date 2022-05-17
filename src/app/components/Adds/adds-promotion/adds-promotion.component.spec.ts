import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsPromotionComponent } from './adds-promotion.component';

describe('AddsPromotionComponent', () => {
  let component: AddsPromotionComponent;
  let fixture: ComponentFixture<AddsPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
