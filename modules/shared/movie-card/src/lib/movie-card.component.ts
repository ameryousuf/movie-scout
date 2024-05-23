import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, viewChild } from '@angular/core';
import { Movie } from '@movie-scout/core';
import { MovieCardStore } from './+state/movie-card.store';
import { MovieCardOverlayComponent } from './movie-card-overlay/movie-card-overlay.component';
import { MovieCardPosterComponent } from './movie-card-poster/movie-card-poster.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MovieCardPosterComponent, MovieCardOverlayComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  providers: [MovieCardStore],
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  posterElementRef = viewChild.required(MovieCardPosterComponent, {
    read: ElementRef,
  });
}
