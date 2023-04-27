import { BehaviorSubject } from 'rxjs';

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T): void {
    this.state.next(data);
  }
}
