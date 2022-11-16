import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval, combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  increment,
  decrement,
  reset,
  resetWithValue,
} from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  count$: Observable<number>;
  counterValue: number;

  constructor(
    private store: Store<{
      count: { counterValue: number; animalType: string };
    }>
  ) {
    this.count$ = store.select('count').pipe(map((gS) => gS.counterValue));

    const api2$ = interval(1000).pipe(filter((s) => s < 1000));

    const api2ValueMultiplyByCount$ = combineLatest([this.count$, api2$]).pipe(
      tap((res) => {
        console.warn(`value from count: ${res[0]}`);
        console.warn(`value from api2: ${res[1]}`);
      }),
      map((res) => res[0] * res[1]),
      filter((s) => s < 300)
    );

    // api2ValueMultiplyByCount$.subscribe((s) =>
    //   console.warn(`mulitiplied value: ${s}`)
    // );
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  resetWithValue() {
    if (!this.counterValue) {
      return;
    }
    this.store.dispatch(resetWithValue({ resetValue: this.counterValue }));
  }
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
