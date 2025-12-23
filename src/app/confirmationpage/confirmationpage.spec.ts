import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmationpage } from './confirmationpage';

describe('Confirmationpage', () => {
  let component: Confirmationpage;
  let fixture: ComponentFixture<Confirmationpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmationpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmationpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
