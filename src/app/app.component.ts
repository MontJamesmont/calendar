import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './shared/settings.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;

  constructor(translate: TranslateService) {
    this.title = 'calendar';

    translate.addLangs(Settings.LANGS);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
