import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarAddComponent } from './admin-car-add.component';

describe('AdminCarAddComponent', () => {
  let component: AdminCarAddComponent;
  let fixture: ComponentFixture<AdminCarAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCarAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
