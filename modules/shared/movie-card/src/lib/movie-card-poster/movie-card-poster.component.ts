import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '@movie-scout/core';

@Component({
  selector: 'app-movie-card-poster',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './movie-card-poster.component.html',
  styleUrl: './movie-card-poster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardPosterComponent {
  movie = input.required<Movie>();
  styleClass = input<string>();
}
