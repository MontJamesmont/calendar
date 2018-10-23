import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit, OnDestroy {
  subscriptionLang: Subscription;
  lang: string;
  langs: string[];
  @Input() notificationsCount: number;

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {
    this.notificationsCount = 0;
  }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang;
    this.langs = this.translateService.getLangs();
    this.subscriptionLang = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.lang = event.lang;
      }
    );

  }

  getToday(): number {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    return day.getTime();
  }

  ngOnDestroy(): void {
    this.subscriptionLang.unsubscribe();
  }
}
