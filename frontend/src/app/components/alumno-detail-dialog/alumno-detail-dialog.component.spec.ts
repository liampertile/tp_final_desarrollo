import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoDetailDialogComponent } from './alumno-detail-dialog.component';

describe('AlumnoDetailDialogComponent', () => {
  let component: AlumnoDetailDialogComponent;
  let fixture: ComponentFixture<AlumnoDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
