import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchChercheurComponent } from './match-chercheur.component';

describe('MatchChercheurComponent', () => {
  let component: MatchChercheurComponent;
  let fixture: ComponentFixture<MatchChercheurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchChercheurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
