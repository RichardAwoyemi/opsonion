import { createAction, props } from '@ngrx/store';
import { IAuth } from '../../../../shared/models/auth';

export const googleSignIn = createAction('[Auth] Google Sign In');
export const mobileGoogleSignIn = createAction('[Auth] Mobile Google Sign In');
export const facebookSignIn = createAction('[Auth] Facebook Sign In');
export const mobileFacebookSignIn = createAction('[Auth] Mobile Facebook Sign In');
export const signInSuccess = createAction('[Auth] Sign In Success');
export const signInError = createAction(
  '[Auth] Sign In Error',
  props<{ errorMessage: string; errorCode: string }>()
);
export const signOut = createAction('[Auth] Sign Out');
export const signOutError = createAction(
  '[Auth] Sign Out Error',
  props<{ errorMessage: string; errorCode: string }>()
);
export const signOutSuccess = createAction('[Auth] Sign Out Success');
export const getData = createAction('[Auth] Get Data');
export const dataReceived = createAction(
  '[Auth] Data Received',
  props<{ payload: Partial<IAuth> }>()
);
export const dataNotReceived = createAction('[Auth] Data Not Received');
