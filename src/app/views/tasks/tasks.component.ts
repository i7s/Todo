import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {OperationType} from "../../dialog/OperationType";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  protected displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  protected dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort!: MatSort;

  public tasks: Task[] = [];
  public priorities: Priority[] = [];

  // текущая выбранная категория (используется для авт. выбора этой категории при создании новой задачи)
  @Input()
  selectedCategory: Category | undefined;

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Output()
  public deleteTask = new EventEmitter<Task>();

  @Output()
  public updateTask = new EventEmitter<Task>();

  @Output()
  public selectCategory = new EventEmitter<Category>(); // нажали на категории из списка задач

  @Output()
  filterByTitle = new EventEmitter<string>(); // поиск задач по названию

  @Output()
  filterByStatus = new EventEmitter<boolean>(); // фильтрация задач по статусу

  @Output()
  filterByPriority = new EventEmitter<Priority>(); // фильтрация задач по приоритету

  @Output()
  private addTask = new EventEmitter<Task>();

  // search
  protected searchTaskText: string = ""; // текущее значение для поиска задач
  protected selectedStatusFilter: boolean | null = null; // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  protected selectedPriorityFilter: Priority | null = null;

  constructor(
    private dataHandler: DataHandlerService,  //доступ к данным
    private dialog: MatDialog  //работа с диалоговым окном
  ) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  protected getPriorityColor(task: Task) {
    if (task.completed) {
      return "#F8F9FA";
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return "#fff";
  }

  private fillTable() {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditTaskDialog(task: Task) {

    //открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperationType.EDIT],
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов

      if (result === 'complete') {
        task.completed = true; // ставим статус задачи 'выполненная'
        this.updateTask.emit(task);
        return;
      }

      if (result === 'activate') {
        task.completed = false; // ставим статус задачи 'не выполненная'
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) { // если нажали ok и есть результат
        this.updateTask.emit(task);
        return;
      }

    })
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ok
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean | null) {
    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter!);
    }

  }

  onFilterByPriority(value: Priority | null) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter!);
    }
  }

  openAddTaskDialog() {
    const task = new Task(0, '', false, undefined, this.selectedCategory);

    const dialogRef = this.dialog.open(EditTaskDialogComponent,
      {data: [task, 'Добавление задачи', OperationType.ADD]});
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если кликнули ok и есть результат
        this.addTask.emit(task);
      }
    });
  }
}
