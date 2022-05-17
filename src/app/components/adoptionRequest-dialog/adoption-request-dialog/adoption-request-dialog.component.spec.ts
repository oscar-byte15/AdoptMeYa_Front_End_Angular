import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRequestDialogComponent } from './adoption-request-dialog.component';

describe('AdoptionRequestDialogComponent', () => {
  let component: AdoptionRequestDialogComponent;
  let fixture: ComponentFixture<AdoptionRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
