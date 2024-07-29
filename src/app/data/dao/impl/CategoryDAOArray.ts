import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {CategoryDAO} from "../interface/CategoryDAO";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    let result = TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()));
    return of(result.sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  add(category: Category): Observable<Category> {
    if (category.id === undefined || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    TestData.categories.push(category);
    return of(category);
  }

  private getLastIdCategory() {
    return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Category> {
    // Перед удалением - нужно в задачах занулить все ссылки на удаленное значение
    // в реальной БД сама обновляет все ссылки (cascade update) - здесь приходится делать вручную (т.к. вместо БД массив)
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory!), 1);
    return of(tmpCategory!);
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory!), 1, category);

    return of(tmpCategory!);
  }

}
