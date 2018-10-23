import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit {
  selectedDate: Date;
  globalLang: string;
  days: Date[][];
  constructor(
    private calendarService: CalendarService,
    private translateService: TranslateService
  ) {
    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);

    this.globalLang = this.translateService.currentLang;
    this.fillDays();
  }

  fillDays(): void {
    this.days = [];
    const year = this.selectedDate.getFullYear(),
      month = this.selectedDate.getMonth(),
      firstDayInView = new Date(year, month, 1),
      lastDayOfMonth = new Date(year, month + 1, 0);

    firstDayInView.setDate(firstDayInView.getDate() - firstDayInView.getDay() + 1);

    let day;
    let week = [];
    for (day = firstDayInView; day.getTime() <= lastDayOfMonth.getTime(); day.setDate(day.getDate() + 1)) {
      week.push(new Date(day));
      if (day.getDay() === 0) {
        this.days.push(week);
        week = [];
      }
    }

    if (week.length > 0) this.days.push(week);

    for (const nextDay = day; this.days[this.days.length - 1].length < 7; nextDay.setDate(nextDay.getDate() + 1)) {
      this.days[this.days.length - 1].push(new Date(nextDay));
    }
  }

  changeMonth(direct: number): void {
    const year = this.selectedDate.getFullYear(),
      month = this.selectedDate.getMonth();
    this.selectedDate = new Date(year, month + direct, 1);
    this.fillDays();
  }

  ngOnInit(): void {
  }
}
