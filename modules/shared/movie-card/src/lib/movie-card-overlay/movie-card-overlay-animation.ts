import {
  AnimationTriggerMetadata,
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { OVERLAY_SCALING_FACTOR } from './movie-card-overlay-config';

const showAnimation = animation([
  style({ transform: `scale(${1 / OVERLAY_SCALING_FACTOR})` }),
  animate('400ms cubic-bezier(0.55, 0, 0.15, 1)'),
]);

const hideAnimation = animation([
  animate(
    '400ms cubic-bezier(0.55, 0, 0.15, 1)',
    style({ transform: `scale(${1 / OVERLAY_SCALING_FACTOR})` }),
  ),
]);

/** Animation that show a moive card overlay in and out. */
export const movieCardOverlayAnimations: {
  /** Transformation animation for the movie card overlay.
   */
  readonly transformMovieCardOverlay: AnimationTriggerMetadata;
} = {
  transformMovieCardOverlay: trigger('transform', [
    transition('void => showing', [useAnimation(showAnimation)]),
    transition('showing => void', [useAnimation(hideAnimation)]),
  ]),
};
