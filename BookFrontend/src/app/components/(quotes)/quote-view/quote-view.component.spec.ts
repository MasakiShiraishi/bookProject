import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteViewComponent } from './quote-view.component';

describe('QuoteViewComponent', () => {
  let component: QuoteViewComponent;
  let fixture: ComponentFixture<QuoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
