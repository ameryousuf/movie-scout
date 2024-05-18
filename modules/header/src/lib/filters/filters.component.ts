import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { UIStateActions, selectMovieGenres } from '@movie-scout/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  private readonly store = inject(Store);

  readonly movieGenres = this.store.selectSignal(selectMovieGenres);

  selectedGenreChange({ value }: MatChipListboxChange) {
    this.store.dispatch(
      UIStateActions.applyGenreFilter({ genre: value ?? '' }),
    );
  }
}
