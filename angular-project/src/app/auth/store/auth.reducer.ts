import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authenticateFail,
  authenticationSuccess,
  clearError,
  loginStart,
  logout,
  signupStart,
} from './auth.actions';

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    authenticationSuccess,
    (state, { email, userId, token, expirationDate }) => {
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };
    }
  ),
  on(logout, (state) => ({
    ...state,
    user: null,
  })),
  on(loginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authenticateFail, (state, { errorMessage }) => ({
    ...state,
    user: null,
    authError: errorMessage,
    loading: false,
  })),
  on(signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(clearError, (state) => ({
    ...state,
    authError: null,
  }))
);
