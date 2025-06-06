import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteComponentDefault } from './asistente-component-default.component';

describe('MypageComponent', () => {
  let component: AsistenteComponentDefault;
  let fixture: ComponentFixture<AsistenteComponentDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteComponentDefault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteComponentDefault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
