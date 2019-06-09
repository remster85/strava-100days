import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChartSampleComponent } from './my-chart-sample.component';

describe('MyChartSampleComponent', () => {
  let component: MyChartSampleComponent;
  let fixture: ComponentFixture<MyChartSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChartSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChartSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
