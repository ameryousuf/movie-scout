import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '@movie-scout/core';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
}
