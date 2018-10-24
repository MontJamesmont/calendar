import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'angular2-moment';

import { CalendarComponent } from './calendar.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
  {
    path: '', component: CalendarComponent, children: [
      { path: '', redirectTo: 'month', pathMatch: 'full' },
      { path: 'month', component: MonthComponent },
      { path: 'day/:date', component: DayComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MomentModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CalendarComponent,
    MonthComponent,
    DayComponent
  ],
  providers: [],
  exports: []
})
export class CalendarModule { }
