import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private dataHender: DataHandlerService) {
  }

  ngOnInit() {
    this.tasks = this.dataHender.getTasks();
    console.log(this.tasks);
  }
}
