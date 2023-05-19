import { createAction, props } from '@ngrx/store';

export const setEvent = createAction(
    '[Event Window] Set Event',
    props<{ event : any }>()
)

export const clearEvent = createAction(
    '[Event Window] Clear Event'
)

