import { Route } from '@angular/router';
import { PermissaoComponent } from './application/permissao/permissao.component';

export const appRoutes: Route[] = [
  {
    path: '**',
    redirectTo: 'home',
  },
  { path: 'home', component: PermissaoComponent },
];
