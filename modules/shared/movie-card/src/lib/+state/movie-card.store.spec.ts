import { TestBed } from '@angular/core/testing';
import { ApiService } from '@movie-scout/core';
import { MockProvider } from 'ng-mocks';
import { MovieCardStore } from './movie-card.store';

describe('MovieCardStore', () => {
  let componentStore: MovieCardStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MovieCardStore, MockProvider(ApiService)],
    });

    componentStore = TestBed.inject(MovieCardStore);
  });

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
