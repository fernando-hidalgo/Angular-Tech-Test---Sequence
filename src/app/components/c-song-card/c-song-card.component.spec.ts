import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { CSongCardComponent } from './c-song-card.component';

describe('CSongCardComponent', () => {
  let component: CSongCardComponent;
  let fixture: ComponentFixture<CSongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CSongCardComponent],
      imports: [CardModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
