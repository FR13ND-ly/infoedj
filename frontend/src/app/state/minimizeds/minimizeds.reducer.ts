import { createReducer, on } from '@ngrx/store'
import { maximizeWindow, minimizeWindow } from './minimizeds.actions';

export const initialState : Array<string> = [];

export const minimizedsReducer = createReducer(
    initialState,

    on(minimizeWindow, (state, action) => [...state, action.window] ),

    on(maximizeWindow, (state, action) => [...(state.filter(item => item !== action.window))])

)