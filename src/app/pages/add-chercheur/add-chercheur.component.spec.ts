import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChercheurComponent } from './add-chercheur.component';

describe('AddChercheurComponent', () => {
  let component: AddChercheurComponent;
  let fixture: ComponentFixture<AddChercheurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChercheurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
