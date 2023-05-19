import { createReducer, on } from '@ngrx/store'
import { addWindow, removeWindow, setInFront } from './windows.actions';

export const initialState : Array<string> = [];

export const windowsReducer = createReducer(
    initialState,

    on(addWindow, (state, action) => [...new Set([...state, action.window])] ),

    on(removeWindow, (state, action) => [...state.filter(item => item !== action.window)]),

    on(setInFront, (state, action) : any => {
        return [...state.filter(item => item !== action.window), action.window]
    })
)