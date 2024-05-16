import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { uiFeature } from './ui/ui.reducer';

export function provideCoreStatesWithEffects(): EnvironmentProviders {
  const providers: EnvironmentProviders[] = [
    provideState(uiFeature.name, uiFeature.reducer),
  ];

  return makeEnvironmentProviders(providers);
}
