import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperationType} from "../OperationType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.css'
})
// редактирование категории
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperationType], // данные которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна из текущего
  ) {
  }

  protected dialogTitle!: string; // текст для диалогового окна
  protected categoryTitle!: string; // текст для названия категории (при редактировании или добавлении)
  private operationType: OperationType = 0; // тип операции

  ngOnInit(): void {
    // получаем переданные в диалоговое окно данные
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];
  }

  // нажали ok
  protected onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  protected onCancel() {
    this.dialogRef.close(false);
  }

  protected delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию "${this.categoryTitle}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });

  }

  protected canDelete(): boolean {
    return this.operationType === OperationType.EDIT;
  }

}
