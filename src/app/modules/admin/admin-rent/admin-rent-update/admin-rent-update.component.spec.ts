import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentUpdateComponent } from './admin-rent-update.component';

describe('AdminRentUpdateComponent', () => {
  let component: AdminRentUpdateComponent;
  let fixture: ComponentFixture<AdminRentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
