import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Output()
  public selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category | undefined;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
  }

  showTasksByCategory(category: Category | null) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category!;
    this.selectCategory.emit(this.selectedCategory);
  }

}
