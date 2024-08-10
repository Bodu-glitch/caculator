import {createAction, props} from "@ngrx/store";

export const displayNum = createAction("[Caculator] DisplayNum",props<{num: string}>());

export const add = createAction("[Caculator] Add", props<{ num1: string, num2: string }>());

export const sub = createAction("[Caculator] Sub", props<{ num1: string, num2: string }>());

export const mul = createAction("[Caculator] Mul", props<{ num1: string, num2: string }>());

export const div = createAction("[Caculator] Div", props<{ num1: string, num2: string }>());

export const clearstate = createAction("[Caculator] Clear");
