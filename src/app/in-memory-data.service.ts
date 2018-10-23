import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Event } from './shared/interfaces/event';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      { id: 1, type: 'chrzest', members: ['Jan Kowalski', 'Janina Kowalska'], date: (new Date(2018, 9, 23)).getTime() },
      { id: 2, type: 'komunia', members: ['SP47'], date: (new Date(2019, 4, 23)).getTime() },
      { id: 3, type: 'bierzmowanie', members: ['LO2'], date: (new Date(2019, 4, 24)).getTime() },
      { id: 4, type: 'ślub', members: ['Janusz Nowak', 'Grażyna Szczęsna'], date: (new Date(2018, 9, 25)).getTime() },
      { id: 5, type: 'chrzest', members: ['Andrzej Nowak', 'Halina Nowak'], date: (new Date(2018, 9, 26)).getTime() },
      { id: 6, type: 'ślub', members: ['Karolina Kowalska', 'Radosław Nowak'], date: (new Date(2018, 9, 27)).getTime() },
      { id: 7, type: 'ślub', members: ['Konrad Nowak', 'Ewelina Kowalska'], date: (new Date(2018, 9, 27)).getTime() },
      { id: 8, type: 'chrzest', members: ['Sebastian Kowalski', 'Anna Kowalska'], date: (new Date(2018, 9, 27)).getTime() },
      { id: 9, type: 'chrzest', members: ['Mateusz Kowalski', 'Sylwia Kowalska'], date: (new Date(2018, 9, 28)).getTime() },
      { id: 10, type: 'ślub', members: ['Jan Kowalski', 'Janina Kowalska'], date: (new Date(2018, 9, 29)).getTime() }
    ];
    return { events };
  }

  genId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(hero => hero.id)) + 1 : 1;
  }
}
