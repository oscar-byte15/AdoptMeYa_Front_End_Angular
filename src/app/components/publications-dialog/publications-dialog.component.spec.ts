import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsDialogComponent } from './publications-dialog.component';

describe('PublicationsDialogComponent', () => {
  let component: PublicationsDialogComponent;
  let fixture: ComponentFixture<PublicationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
