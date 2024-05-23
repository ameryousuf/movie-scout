import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { selectLoading } from '@movie-scout/core';
import { Store } from '@ngrx/store';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ToolbarRowComponent } from '../toolbar-row/toolbar-row.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    ToolbarRowComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);

  readonly loading = this.store.selectSignal(selectLoading);
}
