import { Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Event } from '../../../shared/interfaces/event';
import { EventService } from '../../../services/eventService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy {
  todayEvents: Event[];
  todayEventsSubscription: Subscription;
  private globalLang: string;

  private onLangChangeSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private eventService: EventService
  ) {
    this.globalLang = this.translateService.currentLang;
    this.todayEvents = [];
  }

  public ngOnInit(): void {
    const now = new Date(),
      today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.onLangChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.globalLang = this.translateService.currentLang;
    });

    this.todayEventsSubscription = this.eventService.getEvents(today).subscribe((eventsList: Event[]) => {
      this.todayEvents = eventsList.filter((event: Event) => {
        return event.date === today.getTime();
      });
    });
  }

  public ngOnDestroy(): void {
    this.onLangChangeSubscription.unsubscribe();
    this.todayEventsSubscription.unsubscribe();
  }
}
