import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSongCrudComponent } from './v-song-crud.component';

describe('VSongCrudComponent', () => {
  let component: VSongCrudComponent;
  let fixture: ComponentFixture<VSongCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VSongCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VSongCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
