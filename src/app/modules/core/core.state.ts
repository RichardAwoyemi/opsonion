import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { BaseRouterStoreState } from '@ngrx/router-store';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromUser from './store/shared/user.reducer';

export interface State {
  router: fromRouter.RouterReducerState<BaseRouterStoreState>;
}

export const reducers: ActionReducerMap<unknown> = {
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: Action): State => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
