import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddsComponent } from './my-adds.component';

describe('MyAddsComponent', () => {
  let component: MyAddsComponent;
  let fixture: ComponentFixture<MyAddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
