import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnDestroy,
  computed,
  effect,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { sidebarAnimations } from './sidebar-animation';

/**
 * SidebarComponent is used to create a sidebar with an overlay.
 * This component is a standalone implementation that does not require Material's Sidenav/Drawer components.
 * It uses Angular's CDK Overlay and Portal modules to create and manage the overlay.
 * The sidebar can be positioned at the 'start' (left) or 'end' (right) of the screen.
 * The sidebar's open and close states are managed by a model or function.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, OverlayModule, PortalModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [sidebarAnimations.transformSidebar],
})
export class SidebarComponent implements OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly overlay = inject(Overlay);
  private readonly portal = viewChild.required(CdkPortal);

  private overlayRef: OverlayRef | null = null;

  /** Model to manage the open state of the sidebar */
  opened = model<boolean>();
  /** Input to set the position of the sidebar */
  position = input<'start' | 'end'>('start');

  /** Computed property to set the transform style for the sidebar animation */
  animationTransform = computed(() =>
    this.position() === 'start'
      ? 'translate3d(-100%, 0px, 0px)'
      : 'translate3d(100%, 0px, 0px)',
  );

  constructor() {
    // Effect to open or close the sidebar when the model changes
    effect(() => {
      if (this.opened()) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    // Dispose the overlay when the component is destroyed
    this.disposeOverlay();
  }

  /**
   * Open the sidebar.
   * If the sidebar is already opened, it does nothing.
   * Otherwise, it creates an overlay and attaches the portal to it.
   * It also sets up a subscription to close the sidebar when the overlay is clicked.
   */
  open(): void {
    if (this.opened()) return;

    this.createOverlay();
    this.opened.update(() => true);
  }

  /**
   * Close the sidebar.
   * If the sidebar is not opened, it does nothing.
   * Otherwise, it disposes the overlay and updates the model.
   */
  close(): void {
    if (!this.opened()) return;

    this.disposeOverlay();
    this.opened.update(() => false);
  }

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      panelClass: [
        'sidebar-container',
        this.position() === 'end' ? 'sidebar-end' : '',
      ],
      positionStrategy: this.overlay
        .position()
        .global()
        [this.position() === 'start' ? 'start' : 'end'](),
    });

    this.overlayRef.attach(this.portal());

    this.overlayRef
      .backdropClick()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
