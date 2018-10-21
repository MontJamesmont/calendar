import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { MainComponent } from './layout/components/main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/app', pathMatch: 'full'
  },
  {
    path: 'app', component: MainComponent, children: []
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
