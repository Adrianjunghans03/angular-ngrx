import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, resetWithValue } from './counter.actions';

export const initialState = 0;
export const initialState2 = { counterValue: 0, animalType: null };

// const _counterReducer = createReducer(
//   initialState2,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => (state < 1 ? 0 : state - 1)),
//   on(reset, (_state) => 0),
//   on(resetWithValue, (_state, actionData) => actionData.resetValue)
// );

const _counterReducer = createReducer(
  initialState2,
  on(increment, (state) => ({
    ...state,
    counterValue: state.counterValue + 1,
  })),
  on(decrement, (state) => ({
    ...state,
    counterValue: state.counterValue < 1 ? 0 : state.counterValue - 1,
  })),
  on(reset, (state) => ({ ...state, counterValue: 0 })),
  on(resetWithValue, (state, actionData) => ({
    ...state,
    counterValue: actionData.resetValue,
  }))
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
