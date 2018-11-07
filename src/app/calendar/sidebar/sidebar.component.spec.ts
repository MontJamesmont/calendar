import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TranslateModule } from '@ngx-translate/core';

import { DataTranslationService } from '../data-translation.service';
import { ApiService } from '../../services/api.service';
import { UrlSearchService } from '../../services/urlsearch.service';
import { CalendarService } from '../calendar.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent,
    fixture: ComponentFixture<SidebarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), HttpClientTestingModule],
        declarations: [SidebarComponent],
        providers: [
          CalendarService,
          ApiService,
          UrlSearchService,
          DataTranslationService
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
