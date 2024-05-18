import {
  AnimationTriggerMetadata,
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('200ms cubic-bezier(0, 0, 0.2, 1)'),
]);

const hideAnimation = animation([
  animate(
    '200ms cubic-bezier(0, 0, 0.2, 1)',
    style({ transform: '{{transform}}', opacity: 0 }),
  ),
]);

/** Animation that slides a sidebar in and out. */
export const sidebarAnimations: {
  /** Transformation animation for the sidebar.
   * Accepts a `transform` parameter that specifies the transformation to apply.
   */
  readonly transformSidebar: AnimationTriggerMetadata;
} = {
  transformSidebar: trigger('transform', [
    transition('void => showing', [useAnimation(showAnimation)]),
    transition('showing => void', [useAnimation(hideAnimation)]),
  ]),
};
