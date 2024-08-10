import { createReducer, on } from '@ngrx/store';
import { CaculatorState } from './caculator.state';
import * as CaculatorActions from './caculator.actions';

export const caculatorReducer = createReducer(
  <CaculatorState>{ display: '' },
  on(CaculatorActions.displayNum, (state, { num }) => ({
    display: state.display + num,
  })),
  on(CaculatorActions.add, (state, { num1, num2 }) => ({
    display: (parseFloat(num1) + parseFloat(num2)).toString(),
  })),
  on(CaculatorActions.clearstate, (state) => ({
    display: '',
  })),
  on(CaculatorActions.sub, (state, { num1, num2 }) => ({
    display: (parseFloat(num1) - parseFloat(num2)).toString(),
  })),
  on(CaculatorActions.mul, (state, { num1, num2 }) => ({
    display: (parseFloat(num1) * parseFloat(num2)).toString(),
  })),
  on(CaculatorActions.div, (state, { num1, num2 }) => ({
    display: (parseFloat(num1) / parseFloat(num2)).toString(),
  }))
);
