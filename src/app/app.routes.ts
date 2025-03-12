import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HeroDashboardComponent } from '../heros/hero-dashboard/hero-dashboard.component';
import { HeroListComponent } from '../heros/hero-list/hero-list.component';
import { HeroDetailComponent } from '../heros/hero-detail/hero-detail.component';
import { inject } from '@angular/core';
import { HeroApiService } from '../heros/hero-api.service';
import { TemplateEditorComponent } from '../template-editors/template-editor/template-editor.component';

const heroDetailTitleResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<string | RedirectCommand> => {
  console.log('start resovling data');
  return inject(HeroApiService)
    .findById(Number(route.paramMap.get('id')))
    .then((x) => x?.name || '');
};

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: HeroDashboardComponent,
  },
  {
    path: 'heroes',
    pathMatch: 'full',
    title: 'Heroes',
    component: HeroListComponent,
  },
  {
    path: 'heroes/:id',
    pathMatch: 'full',
    title: heroDetailTitleResolver,
    component: HeroDetailComponent,
  },
  {
    path: 'template-editor',
    pathMatch: 'full',
    title: 'Template Editor',
    component: TemplateEditorComponent,
  },
];
