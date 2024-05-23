import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { applySearchFilter, selectFiltersApplied } from '@movie-scout/core';
import { SidebarComponent } from '@movie-scout/ui';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { FiltersComponent } from '../filters/filters.component';

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
    MatBadgeModule,
    SidebarComponent,
    FiltersComponent,
  ],
  templateUrl: './toolbar-row.component.html',
  styleUrl: './toolbar-row.component.scss',
})
export class ToolbarRowComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchInput = viewChild.required<ElementRef>('searchInput');

  readonly filtersApplied = this.store.selectSignal(selectFiltersApplied);

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
