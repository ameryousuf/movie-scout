import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardPosterComponent } from './movie-card-poster.component';

describe('MovieCardPosterComponent', () => {
  let component: MovieCardPosterComponent;
  let fixture: ComponentFixture<MovieCardPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardPosterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardPosterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
