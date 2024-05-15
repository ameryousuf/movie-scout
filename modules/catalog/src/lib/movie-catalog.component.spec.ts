import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { selectAllMovies } from './+state';
import { MovieCatalogComponent } from './movie-catalog.component';

describe('MovieCatalogComponent', () => {
  let component: MovieCatalogComponent;
  let fixture: ComponentFixture<MovieCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCatalogComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectAllMovies, value: [] }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
