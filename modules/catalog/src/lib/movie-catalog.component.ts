import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-movie-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-catalog.component.html',
  styleUrl: './movie-catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCatalogComponent {}
