import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHomeComponent } from './v-home.component';

describe('VHomeComponent', () => {
  let component: VHomeComponent;
  let fixture: ComponentFixture<VHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
