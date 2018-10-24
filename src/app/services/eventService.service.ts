import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Event } from '../shared/interfaces/event';

@Injectable()
export class EventService {
  endpoint = '/api';
  events = this.endpoint + '/events';

  constructor(
    private http: HttpClient
  ) { }

  public getEvents = (): Observable<Event[]> => {
    return this.http.get<Event[]>(this.events);
  }

  public updateEvent = (event: Event): Observable<Event> => {
    return this.http.post<Event>(this.events, event);
  }
}
