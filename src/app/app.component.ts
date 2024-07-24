import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Todo';
  tasks!: Task[];
  categories!: Category[];

  private selectedCategory!: Category | null;

  constructor(
    private dataHandler: DataHandlerService, //фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(task => this.tasks = task);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks
    });
  }
}
