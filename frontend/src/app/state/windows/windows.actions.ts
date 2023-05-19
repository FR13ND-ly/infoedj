import { createAction, props } from '@ngrx/store';

export const addWindow = createAction(
    '[Overlay] Add Window',
    props<{ window : string }>()
)

export const removeWindow = createAction(
    '[Overlay] remove Window',
    props<{ window : string }>()
)

export const setInFront = createAction(
    '[Overlay] Set in front Window',
    props<{ window : string }>()
)