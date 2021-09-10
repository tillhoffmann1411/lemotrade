import { ILoginCred } from '../../interfaces/lemon-api-search';
import { UserActionType } from '../action-types/user.action-types';
import { Dispatch } from 'redux';
import { IUserActions } from '../actions/user.actions';
import { register } from '../../services/lemon-markets.service';



export const login = (cred: ILoginCred) => {
  return async(dispatch: Dispatch<IUserActions>) => {
    const data = await register(cred);
    if (data) {
      dispatch({
        type: UserActionType.LOGIN,
        payload: data
      });
    }
  }
}

export const logout = () => {
  return (dispatch: Dispatch<IUserActions>) => {
    dispatch({
      type: UserActionType.LOGOUT,
    });
  }
}