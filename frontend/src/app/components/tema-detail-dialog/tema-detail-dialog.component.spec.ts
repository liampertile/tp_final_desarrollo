import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaDetailDialogComponent } from './tema-detail-dialog.component';

describe('TemaDetailDialogComponent', () => {
  let component: TemaDetailDialogComponent;
  let fixture: ComponentFixture<TemaDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemaDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemaDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
