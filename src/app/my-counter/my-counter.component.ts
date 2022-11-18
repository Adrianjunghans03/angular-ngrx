import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  interval,
  combineLatest,
  BehaviorSubject,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
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
export class MyCounterComponent implements OnDestroy {
  @Input() set numberFromParent(val: number) {
    console.log(val);
    this.numberFromPArent$.next(val);
  }

  numberFromPArent$ = new ReplaySubject<number>(1);
  //count$: Observable<number>;
  count$ = this.store.select('count').pipe(
    map((gS) => gS.counterValue),
    tap((value) =>
      value > 20
        ? this.countValueAbouve20$.next(value)
        : this.countValueAbouve20$.next(undefined)
    )
  );
  counterValue: number;
  countValueAbouve20$ = new BehaviorSubject<number>(undefined);
  countValueAboue30$ = new ReplaySubject<string>(1);
  countValueAbove40$ = new Subject<string>();

  destroySubscription$ = new Subject<null>();
  numberFromParentPlusCountFromStore$ = combineLatest([
    this.numberFromPArent$,
    this.count$,
  ]).pipe(map((res) => res[0] + res[1]));

  constructor(
    private store: Store<{
      count: { counterValue: number; animalType: string };
    }>
  ) {
    this.countValueAbove40$.next('first value');
    this.countValueAbove40$.next('second value');
    this.countValueAbove40$
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe((s) => console.warn(s));
    this.countValueAbove40$.next('third value');
    this.countValueAbove40$.next('fourth value');

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
  ngOnDestroy() {
    this.destroySubscription$.next();
    console.log('Hey');
  }
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
