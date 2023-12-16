import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsereditComponent } from './admin-useredit.component';

describe('AdminUsereditComponent', () => {
  let component: AdminUsereditComponent;
  let fixture: ComponentFixture<AdminUsereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUsereditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUsereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
