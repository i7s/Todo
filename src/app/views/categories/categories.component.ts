import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private dataHender: DataHandlerService) {
  }

  ngOnInit() {
    this.categories = this.dataHender.getCategories();
    console.log(this.categories);
  }
}
