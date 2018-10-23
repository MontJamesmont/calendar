import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Event } from '../../shared/interfaces/event';
import { EventService } from '../../services/eventService.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit, OnDestroy {
  day: Date;
  globalLang: string;
  events: Event[];
  private paramsSubscription: Subscription;
  private eventsSubscription: Subscription;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.events = [];

    this.globalLang = this.translateService.currentLang;
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.day = new Date(Number(params['date']));
      this.eventsSubscription = this.eventService.getEvents().subscribe((eventsList: Event[]) => {
        this.events = eventsList.filter((event: Event) => {
          return event.date === this.day.getTime();
        });
      });
    });
  }

  public ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
  }
}
