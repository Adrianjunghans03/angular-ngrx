import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
