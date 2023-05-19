import { createReducer, on } from '@ngrx/store'
import { clearEvent, setEvent } from './event.actions';

export const initialState : any = {};

export const eventReducer = createReducer(
    initialState,

    on(setEvent, (state, action) => action.event ),

    on(clearEvent, (state, action) => {})
)
