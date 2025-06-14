import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChercheurComponent } from './list-chercheur.component';

describe('ListChercheurComponent', () => {
  let component: ListChercheurComponent;
  let fixture: ComponentFixture<ListChercheurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChercheurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
