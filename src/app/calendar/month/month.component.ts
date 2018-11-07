import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Event } from '../../shared/interfaces/event';
import { EventService } from '../../services/eventService.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit {
  selectedDate: Date;
  globalLang: string;
  days: Date[][];
  events: Event[];
  newEvent;
  isEditArray: number[];
  private eventsSubscription: Subscription;

  constructor(
    private eventService: EventService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.selectedDate = new Date();
    this.selectedDate.setHours(0, 0, 0, 0);
    this.events = [];
    this.isEditArray = [];

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

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((eventsList: Event[]) => {
      this.events = eventsList;
    });
  }

  getEventsInDay(day: Date): Event[] {
    return this.events.filter((event: Event) => {
      return this.isEventDay(event, day);
    });
  }

  addNewEvent($event: any, day: Date): void {
    day.setHours(0, 0, 0, 0);
    this.newEvent = { type: $event.dragData, date: day.getTime(), members: '' };
  }

  isNewEventInDay(day: Date): boolean {
    day.setHours(0, 0, 0, 0);
    return this.newEvent ? day.getTime() === this.newEvent.date : false;
  }

  cancel(): void {
    this.newEvent = undefined;
  }

  isEventDay(event: Event, day: Date): boolean {
    day.setHours(0, 0, 0, 0);
    if (day.getTime() === event.date) return true;
    return false;
  }

  changeMonth(direct: number): void {
    const year = this.selectedDate.getFullYear(),
      month = this.selectedDate.getMonth();
    this.selectedDate = new Date(year, month + direct, 1);
    this.fillDays();
  }

  showDay(day: Date): void {
    day.setHours(0, 0, 0, 0);
    this.router.navigate(['app/calendar/day', day.getTime()]);
  }

  editEvent(event: Event): void {
    if (!this.isEdit(event)) this.isEditArray.push(event.id);
  }

  isEdit(event: Event): boolean {
    const id = this.isEditArray.find((eventId) => {
      return eventId === event.id;
    });

    return id ? true : false;
  }

  save(event: Event): void {
    this.isEditArray = this.isEditArray.filter((id: number) => {
      return id !== event.id;
    });
    this.eventService.updateEvent(event).subscribe(res => {
      this.getEvents();
      if (!event.id) this.newEvent = undefined;
    });
  }
}
