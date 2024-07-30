import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {

  @Input()
  completed = false;

  @Input()
  iconName: string = '';

  @Input()
  count: any;

  @Input()
  countTotal: any;

  @Input()
  title: string = '';

  constructor() {
  }

}
