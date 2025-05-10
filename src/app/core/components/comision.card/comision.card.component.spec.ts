import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionCardComponent } from './comision.card.component';

describe('ComisionesCardComponent', () => {
  let component: ComisionCardComponent;
  let fixture: ComponentFixture<ComisionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComisionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
