import { createReducer, on } from '@ngrx/store'
import { clearImage, setImage } from './image.actions';

export const initialState : string = '';

export const imageReducer = createReducer(
    initialState,

    on(setImage, (state, action) => action.image ),

    on(clearImage, (state, action) => '')
)
