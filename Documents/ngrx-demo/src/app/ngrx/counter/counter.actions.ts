import {createAction, props} from "@ngrx/store";

export const increase = createAction("[Counter] Increase");

export const decrease = createAction("[Counter] Decrease");

export const inputN = createAction("[Counter] InputN",
  props<{ n: number }>()
);

export const reset = createAction("[Counter] Reset");
