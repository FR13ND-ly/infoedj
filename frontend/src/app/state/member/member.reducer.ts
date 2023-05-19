import { createReducer, on } from '@ngrx/store'
import { clearMember, setMember } from './member.actions';

export const initialState : any = {};

export const memberReducer = createReducer(
    initialState,

    on(setMember, (state, action) => action.member ),

    on(clearMember, (state, action) => {})
)
