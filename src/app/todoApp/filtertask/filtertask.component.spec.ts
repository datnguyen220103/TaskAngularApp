import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltertaskComponent } from './filtertask.component';

describe('FiltertaskComponent', () => {
  let component: FiltertaskComponent;
  let fixture: ComponentFixture<FiltertaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltertaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
