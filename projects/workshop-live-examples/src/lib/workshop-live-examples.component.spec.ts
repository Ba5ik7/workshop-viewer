import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopLiveExamplesComponent } from './workshop-live-examples.component';

describe('WorkshopLiveExamplesComponent', () => {
  let component: WorkshopLiveExamplesComponent;
  let fixture: ComponentFixture<WorkshopLiveExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopLiveExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopLiveExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
