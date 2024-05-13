/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'app-root max-w-screen-2xl px-6 md:px-16',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly iconRegistry = inject(MatIconRegistry);

  constructor() {
    // Set the default font set class to 'material-symbols-outlined' supported by M3 for the entire application
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
