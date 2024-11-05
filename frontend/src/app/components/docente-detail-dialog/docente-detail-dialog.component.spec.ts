import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDetailDialogComponent } from './docente-detail-dialog.component';

describe('DocenteDetailDialogComponent', () => {
  let component: DocenteDetailDialogComponent;
  let fixture: ComponentFixture<DocenteDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
