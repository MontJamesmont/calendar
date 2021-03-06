import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

import { MonthComponent } from './month/month.component';

const routes: Routes = [
  {
    path: '', component: CalendarComponent, children: [
      { path: '', redirectTo: 'month', pathMatch: 'full' },
      { path: 'month', component: MonthComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({}),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CalendarComponent,
    MonthComponent,
  ],
  providers: [
    CalendarService,
  ],
  exports: []
})
export class CalendarModule { }
