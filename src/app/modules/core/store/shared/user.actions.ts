import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../shared/models/user';

export const getData = createAction('[User] Get Data');
export const dataReceived = createAction(
  '[User] Data Received',
  props<{ payload: Partial<IUser> }>()
);
export const dataNotReceived = createAction('[User] Data Not Received');
export const signOut = createAction('[User] Sign Out');
export const signOutSuccess = createAction('[User] Sign Out Success');
