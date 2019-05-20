import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './selective-preload-strategy';
const appRoutes: Routes = [
  {
    path: '', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: SelectivePreloadStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
