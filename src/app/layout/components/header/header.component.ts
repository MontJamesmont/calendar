import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
    private translateService: TranslateService
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

  ngOnDestroy(): void {
    this.subscriptionLang.unsubscribe();
  }
}
