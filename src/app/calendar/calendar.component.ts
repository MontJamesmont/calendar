import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  constructor() { }
}
