import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEmplDepComponent } from './board-empl-dep.component';

describe('BoardEmplDepComponent', () => {
  let component: BoardEmplDepComponent;
  let fixture: ComponentFixture<BoardEmplDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardEmplDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardEmplDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
