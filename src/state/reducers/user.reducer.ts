import { IRegisterResponse } from '../../interfaces/lemon-api-search';
import { UserActionType } from '../action-types/user.action-types';
import { IUserActions } from '../actions/user.actions';

// Define the initial state using that type
const initialState: IRegisterResponse = {
  access_token: '',
  expires_in: 0,
  scope: '',
  token_type: ''
}

const reducer = (state = initialState, action: IUserActions) => {
  switch (action.type) {
    case UserActionType.LOGIN: {
      return {...state, ...action.payload}
    }
    case UserActionType.LOGOUT: {
      return {...initialState};
    }
    default:
      return state
  }
}

export default reducer;