import {createReducer, on} from "@ngrx/store";
import {CounterState} from "./counterstate";

import * as CountActions from './counter.actions';
import {AppComponent} from "../../app.component";

export const counterReducer = createReducer(<CounterState>{
    count: 7
  },
  on(CountActions.increase, (state)=>{
    return {
      count: state.count + 1
    }
  }),
  on(CountActions.decrease, (state)=>{
    return {
      count: state.count - 1
    }
  }),
  on(CountActions.inputN, (state, {n})=>{
    return {
      count: n
    }
  }),
  on(CountActions.reset, (state)=>{
    return {
      count: 7
    }
  }),
)
