import {createReducer, on} from "@ngrx/store";
import {TimeState} from "./time.state";
import * as TimeActions from './time.actions';

export const timeReducer = createReducer(<TimeState>{
  time: new Date()
},
  on(TimeActions.getTime, (state)=>{
    return {
      time: new Date()
    }
  })
)
