import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные которые передали в диалоговое окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

  protected categories!: Category[];
  protected priorities!: Priority[];

  protected dialogTitle!: string; //заголовок окна
  protected task!: Task; //задача для редактирования/создания

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  protected tmpTitle!: string;
  protected tmpCategory!: Category;
  protected tmpPriority!: Priority;
  protected tmpDate!: Date | null;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    // инициализация начальных значений (записываем в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category!;
    this.tmpPriority = this.task.priority!;
    this.tmpDate = this.task.date!;

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items)
  }

  onConfirm() {
    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate!;

    // передаем добавленную/измененную задачу в обработчик
    this.dialogRef.close(this.task);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel() {
    this.dialogRef.close(null);
  }

  // нажали удалить
  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }

  // нажали выполнить (завершить) задачу
  complete() {
    this.dialogRef.close('complete')
  }

  // делаем статус задачи "незавершенным" (активируем)
  activate() {
    this.dialogRef.close('activate')
  }
}
