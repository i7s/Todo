import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent {

  @Input()
  totalTasksInCategory: number = 0;

  @Input()
  completeTasksInCategory: number = 0;

  @Input()
  unCompleteTasksInCategory: number = 0;

  @Input()
  showStat: boolean = true;

}
