import { createAction, props } from '@ngrx/store';

export const minimizeWindow = createAction(
    '[Bar] Minimize Window',
    props<{ window : string }>()
)

export const maximizeWindow = createAction(
    '[Bar] Maximize Window',
    props<{ window : string }>()
)