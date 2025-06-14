import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrevetListComponent } from './brevet-list.component';

describe('BrevetListComponent', () => {
  let component: BrevetListComponent;
  let fixture: ComponentFixture<BrevetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrevetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrevetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
