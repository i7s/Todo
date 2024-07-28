import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Todo';
  tasks: Task[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];

  protected selectedCategory: Category | null = null; // null - значит будет выбрана категория "Все"

  // поиск
  searchTaskText = ''; // текущее значение для поиска задач

  // фильтрация
  protected statusFilter: boolean | null = null; // all statuses by default
  protected priorityFilter: Priority | null = null; // all statuses by default

  constructor(
    private dataHandler: DataHandlerService, //фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null); // показать все задачи
  }

  onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  onUpdateTask(task: Task) {
    this.updateTasks();
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.onSelectCategory(this.selectedCategory)
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категории 'Все'
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    console.log(status);
    this.updateTasks();
  }

  // поиск задач
  onSearchTasks(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  // обновить список задач
  updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks();
    });
  }
}
