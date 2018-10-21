import { Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy {
  private globalLang: string;

  private onLangChangeSubscription: Subscription;

  constructor(
    private translateService: TranslateService
  ) {
    this.globalLang = this.translateService.currentLang;
  }

  public ngOnInit(): void {
    this.onLangChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.globalLang = this.translateService.currentLang;
    });
  }

  public ngOnDestroy(): void {
    this.onLangChangeSubscription.unsubscribe();
  }
}
