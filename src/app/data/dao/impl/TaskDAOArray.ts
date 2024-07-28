import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";
import {TaskDAO} from "../interface/TaskDAO";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(task => task.id === id)!); //  non-null assertion
  }

  add(task: Task): Observable<Task> {
    if (task.id === undefined || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  private getLastIdTask() {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }

  delete(id: number): Observable<Task> {
    const taskTemp = TestData.tasks.find(t => t.id === id); // удаляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTemp!), 1);
    return of(taskTemp!);
  }

  search(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Task[] {
    let allTasks = TestData.tasks;
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    return allTasks;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id); // обновляем по id
    if (taskTmp) {
      TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    }
    return of(task);
  }


}
