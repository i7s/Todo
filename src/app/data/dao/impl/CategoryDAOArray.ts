import {Observable, of} from "rxjs";
import { Category } from "../../../model/Category";
import {CategoryDAO} from "../interface/CategoryDAO";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    throw new Error("Method not implemented.");
  }

  add(arg: Category): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  update(arg: Category): Observable<Category> {
    throw new Error("Method not implemented.");
  }

}
