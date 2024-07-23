import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

}
