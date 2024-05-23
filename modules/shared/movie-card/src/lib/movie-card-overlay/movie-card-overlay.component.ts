import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Movie } from '@movie-scout/core';
import {
  Observable,
  Subject,
  filter,
  fromEvent,
  map,
  merge,
  race,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { MovieCardStore } from '../+state/movie-card.store';
import { MovieCardPosterComponent } from '../movie-card-poster/movie-card-poster.component';
import { movieCardOverlayAnimations } from './movie-card-overlay-animation';
import {
  OVERLAY_POSITIONS,
  OVERLAY_SCALING_FACTOR,
} from './movie-card-overlay-config';

@Component({
  selector: 'app-movie-card-overlay',
  standalone: true,
  imports: [
    CommonModule,
    OverlayModule,
    MatChipsModule,
    MatBadgeModule,
    MatIconModule,
    MovieCardPosterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './movie-card-overlay.component.html',
  styleUrl: './movie-card-overlay.component.scss',
  animations: [movieCardOverlayAnimations.transformMovieCardOverlay],
})
export class MovieCardOverlayComponent {
  private readonly document = inject(DOCUMENT);
  private readonly movieCardStore = inject(MovieCardStore);
  private readonly overlay = viewChild.required(CdkConnectedOverlay);
  private readonly connectedOverlayAttached = new Subject<void>();

  readonly parentElementRef = inject(ElementRef, { skipSelf: true });
  readonly opened = toSignal(this.getHoverEventStream(), {
    initialValue: false,
  });
  readonly vm = this.movieCardStore.vm;

  readonly overlayPositions = OVERLAY_POSITIONS;

  movie = input.required<Movie>();
  parentPosterElementRef = input.required<ElementRef>({
    alias: 'posterElementRef',
  });

  get connectedOverlayWidth() {
    return (
      this.parentPosterElementRef().nativeElement.offsetWidth *
      OVERLAY_SCALING_FACTOR
    );
  }

  get connectedOverlayHeight() {
    return (
      this.parentPosterElementRef().nativeElement.offsetHeight *
      OVERLAY_SCALING_FACTOR
    );
  }

  overlayAttached() {
    this.connectedOverlayAttached.next();

    // Fetch the movie info when the overlay is attached to the DOM
    this.movieCardStore.fetchMovieInfo(this.movie().id);
  }

  private getHoverEventStream(): Observable<boolean> {
    const scrollEvent = fromEvent(this.document, 'scroll');

    const enterEvent = fromEvent(
      this.parentElementRef.nativeElement,
      'mouseenter',
    );
    const leaveEvent = fromEvent(
      this.parentElementRef.nativeElement,
      'mouseleave',
    );

    // Open the overlay when the user hovers over the parent element for 400ms without leaving it or scrolling.
    const parentElementHovered = enterEvent.pipe(
      switchMap(() =>
        race(
          timer(400).pipe(map(() => true)),
          leaveEvent.pipe(map(() => false)),
          scrollEvent.pipe(map(() => false)),
        ),
      ),
      filter((isOver) => isOver),
    );

    // Close the overlay when the mouse leaves the overlay element
    const connectedOverlayLeaved = this.connectedOverlayAttached.pipe(
      switchMap(() => this.getConnectedOverlayLeavedEventStream()),
      map(() => false),
    );

    return merge(parentElementHovered, connectedOverlayLeaved);
  }

  private getConnectedOverlayLeavedEventStream(): Observable<void> {
    return fromEvent(
      this.overlay().overlayRef.overlayElement,
      'mouseleave',
    ).pipe(
      map(() => void 0),
      take(1),
    );
  }
}
