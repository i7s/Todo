import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray();
  private categoryDAOArray = new CategoryDAOArray();
  private priorityDAOArray = new PriorityDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDAOArray.delete(id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  addCategory(title: string): Observable<Category> {
    return this.categoryDAOArray.add(new Category(0, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDAOArray.search(title);
  }
}
