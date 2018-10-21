import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';
import { EMPTY, from, Observable } from 'rxjs';

import { DataTranslationService } from '../data-translation.service';
import { IScene, IActionRow } from '../calendar.models';
import { CalendarService } from '../calendar.service';
import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let component: MonthComponent,
    fixture: ComponentFixture<MonthComponent>,
    calendarService: CalendarService,
    spyGetScene: jasmine.Spy;

  const data: IScene[] = [
    { created: 1, updated: 2, id: 0, name: 'Text', type: 'magic', content: '', sceneView: [] },
    { created: 3, updated: 4, id: 2, name: 'Text2', type: 'magic', content: '', sceneView: [] },
    { created: 5, updated: 6, id: 4, name: 'Text4', type: 'json', content: '', sceneView: [] },
    { created: 7, updated: 8, id: 5, name: 'Text5', type: 'magic', content: '', sceneView: [] },
    { created: 9, updated: 10, id: 7, name: 'Text7', type: 'lua', content: '', sceneView: [] },
    { created: 11, updated: 12, id: 9, name: 'Text9', type: 'magic', content: '', sceneView: [] }
  ],
    actionRow: IActionRow = {
      condition: 'any',
      conditions: [{
        config: {
          type: 'weather',
          icon: 'weather-humidity.png',
          name: 'Weather humidity',
          slug: 'weather-humidity',
          restrictions: 'right'
        },
        content: null
      }
      ],
      actions: [{
        config: {
          type: 'weather',
          icon: 'weather-temperature.png',
          name: 'Weather temperature',
          slug: 'weather-temperature',
          restrictions: 'right'
        },
        content: null
      }
      ],
    };

  class CalendarServiceMock {
    getScene(): Observable<any> {
      return from([data[5]]);
    }

    save(): Observable<any> {
      return EMPTY;
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), RouterTestingModule],
        providers: [
          {
            provide: ActivatedRoute, useValue: {
              params: from([{ id: 1 }])
            }
          },
          { provide: CalendarService, useClass: CalendarServiceMock },
          DataTranslationService
        ],
        declarations: [MonthComponent],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    calendarService = fixture.debugElement.injector.get(CalendarService) as any;
    spyGetScene = spyOn(calendarService, 'getScene').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getScene onInit', async(() => {
    fixture.whenStable().then(() => {
      expect(spyGetScene).toHaveBeenCalled();
    });
  }));

  it('scene should be defined after onInit', async(() => {
    fixture.whenStable().then(() => {
      expect(component.scene).toBe(data[5]);
    });
  }));

  it('after call addnewRow scene.sceneView should contain empty actionRow', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.addnewRow();
      fixture.detectChanges();
      expect(component.scene.sceneView.length).toBeGreaterThan(0);
    });
  }));

  it('after call rowChanges with example actionRow and row index, scene.sceneView should be example actionRow', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.rowChanges(actionRow, 0);
      fixture.detectChanges();
      expect(component.scene.sceneView[0]).toBe(actionRow);
    });
  }));

  it('after call deleteRow with row index, scene.content should be empty', async(() => {
    fixture.whenStable().then(() => {
      component.deleteRow('', 0);
      fixture.detectChanges();
      expect(component.scene.sceneView.length).toBe(0);
    });
  }));
});
