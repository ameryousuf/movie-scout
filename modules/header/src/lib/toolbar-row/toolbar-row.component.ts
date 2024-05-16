import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { applySearchFilter } from '@movie-scout/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-toolbar-row',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './toolbar-row.component.html',
  styleUrl: './toolbar-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarRowComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput = viewChild.required<ElementRef>('searchInput');

  ngOnInit(): void {
    fromEvent(this.searchInput().nativeElement, 'input')
      .pipe(
        map(() => this.searchInput().nativeElement.value),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.store.dispatch(applySearchFilter({ searchTerm: value }));
      });
  }
}
