import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit {

  constructor(
    private calendarService: CalendarService
  ) { }


  ngOnInit(): void {
  }
}
