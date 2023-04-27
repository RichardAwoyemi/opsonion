import { IUser } from '../../../../shared/models/user';
import * as UserActions from './user.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  user: IUser | null;
  error: string;
}

const initialState: IUser = {
  uid: null,
  credits: 0,
  email: null,
  displayName: null,
  photoURL: null,
  emailVerified: null,
  dobDay: null,
  dobMonth: null,
  dobYear: null,
  postcode: null,
  selectedCurrency: null,
  streetAddress1: null,
  streetAddress2: null,
  city: null,
  username: null,
  firstName: null,
  lastName: null,
  referralId: null,
  referredBy: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getData, (state) => ({ ...state })),
  on(UserActions.dataReceived, (state, payload) => ({
    ...state,
    ...payload.payload,
  })),
  on(UserActions.dataNotReceived, (state) => ({ ...state })),
  on(UserActions.signOut, (state) => ({ ...state })),
  on(UserActions.signOutSuccess, (state) => ({ ...state, ...initialState }))
);

export function reducer(state: IUser | undefined, action: Action): IUser {
  return userReducer(state, action);
}
