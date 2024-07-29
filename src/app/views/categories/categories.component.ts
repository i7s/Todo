import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {OperationType} from "../../dialog/OperationType";

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

  @Output()
  addCategory = new EventEmitter<string>(); // передаем только название

  @Output()
  searchCategory = new EventEmitter<string>(); // поиск по строке

  @Input()
  selectedCategory: Category | null = null;

  protected indexMouseMove: number | null = null;
  protected searchCategoryTitle: string = ''; // текущее значение для поиска категорий

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  protected showTasksByCategory(category: Category | null) {
    if (this.selectedCategory === category) {
      return;
    }
    if(category == null) {
      console.log("category == null");
    }

    this.selectedCategory = category!;
    this.selectCategory.emit(this.selectedCategory);
  }

  protected showEditIcon(index: number | null) {
    this.indexMouseMove = index;
  }

  protected openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OperationType.EDIT],
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

  openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OperationType.ADD],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addCategory.emit(result as string)
      }
    });
  }

  // поиск категории
  search() {
    if(this.searchCategoryTitle == null) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle)
  }
}
