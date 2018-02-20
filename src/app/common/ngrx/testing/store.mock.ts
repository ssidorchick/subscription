import { Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';


export class StoreMock {
  private selectors = new Map<any, ReplaySubject<any>>();

  public dispatch(action: Action): void { }

  public select<R>(pathOrMapFn: any, ...paths: string[]): ReplaySubject<R> {
    if (!this.selectors.has(pathOrMapFn)) {
      this.selectors.set(pathOrMapFn, new ReplaySubject(1));
    }
    return this.selectors.get(pathOrMapFn);
  }

  public mockSelection(selector, data) {
    this.select(selector).next(data);
  }
}
