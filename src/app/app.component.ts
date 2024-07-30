import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  protected title = 'Todo';
  protected tasks: Task[] = [];
  protected categories: Category[] = [];
  protected priorities: Priority[] = [];

  // статистика
  protected totalTasksCountInCategory: number = 0;
  protected completedCountInCategory: number = 0;
  protected unCompletedCountInCategory: number = 0;
  protected unCompletedTotalTasksCount: number = 0;

  protected showStat = true;

  protected selectedCategory: Category | null = null; // null - значит будет выбрана категория "Все"

  // поиск
  protected searchTaskText = ''; // текущее значение для поиска задач

  // фильтрация
  protected statusFilter: boolean | null = null; // all statuses by default
  protected priorityFilter: Priority | null = null; // all statuses by default
  protected searchCategoryText: string = '';

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
    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task) {
    this.updateTasksAndStat();
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
      this.onSearchCategory(this.searchCategoryText);
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
      this.updateTasksAndStat();
    });
  }

  // добавление категории
  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => {
      this.updateCategories();
    });
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUnCompletedTotalCount()
    ).subscribe(array => {
      this.totalTasksCountInCategory = array[0];
      this.completedCountInCategory = array[1];
      this.unCompletedCountInCategory = array[2];
      this.unCompletedTotalTasksCount = array[3];
    });
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }
}
