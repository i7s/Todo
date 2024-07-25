import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent implements OnInit {
  protected dialogTitle: string;
  protected message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>, // для работы с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string }
  ) {
    this.dialogTitle = data.dialogTitle; // заголовок
    this.message = data.message; // сообщение
  }

  ngOnInit(): void {
  }

  // нажали ok
  onConfirm() {
    this.dialogRef.close(true);
  }

  // нажали отмену
  onCancel() {
    this.dialogRef.close(false);
  }

}
