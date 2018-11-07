import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { DndModule } from 'ng2-dnd';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
    DndModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CalendarComponent,
    MonthComponent,
    SidebarComponent,
    DayComponent
  ],
  providers: [],
  exports: [DndModule]
})
export class CalendarModule { }
