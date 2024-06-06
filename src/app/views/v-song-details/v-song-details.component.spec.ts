import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSongDetailsComponent } from './v-song-details.component';

describe('VSongDetailsComponent', () => {
  let component: VSongDetailsComponent;
  let fixture: ComponentFixture<VSongDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VSongDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VSongDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
