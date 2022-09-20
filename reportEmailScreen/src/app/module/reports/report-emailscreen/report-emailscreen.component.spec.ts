import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmailscreenComponent } from './report-emailscreen.component';

describe('ReportEmailscreenComponent', () => {
  let component: ReportEmailscreenComponent;
  let fixture: ComponentFixture<ReportEmailscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmailscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmailscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
