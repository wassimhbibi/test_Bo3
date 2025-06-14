import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrevetComponent } from './brevet.component';

describe('BrevetComponent', () => {
  let component: BrevetComponent;
  let fixture: ComponentFixture<BrevetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrevetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrevetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
