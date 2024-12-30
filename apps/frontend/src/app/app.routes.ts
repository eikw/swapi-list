import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
];
