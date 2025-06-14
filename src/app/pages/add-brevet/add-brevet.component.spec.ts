import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrevetComponent } from './add-brevet.component';

describe('AddBrevetComponent', () => {
  let component: AddBrevetComponent;
  let fixture: ComponentFixture<AddBrevetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBrevetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrevetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
