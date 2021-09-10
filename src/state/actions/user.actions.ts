import { IRegisterResponse } from '../../interfaces/lemon-api-search';
import { UserActionType } from '../action-types/user.action-types';

interface LoginAction {
  type: UserActionType.LOGIN;
  payload: IRegisterResponse;
}

interface LogoutAction {
  type: UserActionType.LOGOUT;
}

export type IUserActions = LoginAction | LogoutAction;