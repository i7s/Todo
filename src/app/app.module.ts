import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from "./views/categories/categories.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditTaskDialogComponent} from "./dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from "./pipe/task-date.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditCategoryDialogComponent} from "./dialog/edit-category-dialog/edit-category-dialog.component";
import {FooterComponent} from "./views/footer/footer.component";

import {registerLocaleData} from "@angular/common";
import localeRU from '@angular/common/locales/ru';
import {AboutDialogComponent} from "./dialog/about-dialog/about-dialog.component";
import {HeaderComponent} from "./views/header/header.component";
import {StatComponent} from "./views/stat/stat.component";
import {StatCardComponent} from "./views/stat/stat-card/stat-card.component";

registerLocaleData(localeRU);


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
