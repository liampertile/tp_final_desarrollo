import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDetailDialogComponent } from './curso-detail-dialog.component';

describe('CursoDetailDialogComponent', () => {
  let component: CursoDetailDialogComponent;
  let fixture: ComponentFixture<CursoDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
