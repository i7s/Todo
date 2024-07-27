import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category | undefined;

  protected indexMouseMove: number | null = null;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  protected showTasksByCategory(category: Category | null) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category!;
    this.selectCategory.emit(this.selectedCategory);
  }

  protected showEditIcon(index: number | null) {
    this.indexMouseMove = index;
  }

  protected openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category); // вызываем внешний обработчик
        return;
      }

      if (typeof result === "string") { // нажали сохранить
        category.title = <string>result;
        this.updateCategory.emit(category);
        return;
      }
    });
  }

}
