import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPublicationsComponent } from './view-all-publications.component';

describe('ViewAllPublicationsComponent', () => {
  let component: ViewAllPublicationsComponent;
  let fixture: ComponentFixture<ViewAllPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
