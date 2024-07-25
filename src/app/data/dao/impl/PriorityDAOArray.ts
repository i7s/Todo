import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../../model/Priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {

  add(arg: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  get(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(arg: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

}
