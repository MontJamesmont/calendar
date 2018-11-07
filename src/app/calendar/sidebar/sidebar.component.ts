import { Component } from '@angular/core';
import { eventTypes } from '../calendar.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  types: string[];

  constructor() {
    this.types = eventTypes;
  }
}
