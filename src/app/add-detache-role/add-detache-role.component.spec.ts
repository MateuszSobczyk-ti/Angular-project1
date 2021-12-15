import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetacheRoleComponent } from './add-detache-role.component';

describe('AddDetacheRoleComponent', () => {
  let component: AddDetacheRoleComponent;
  let fixture: ComponentFixture<AddDetacheRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetacheRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetacheRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
