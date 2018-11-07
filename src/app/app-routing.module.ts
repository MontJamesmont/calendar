import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { MainComponent } from './layout/components/main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/app/calendar/month', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/app/calendar/month', pathMatch: 'full'
  },
  {
    path: 'app', component: MainComponent, children: [
      { path: '', redirectTo: '/app/calendar/month', pathMatch: 'full' },
      { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' }
    ]
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
