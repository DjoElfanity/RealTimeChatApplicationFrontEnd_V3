import { UPDATE_LAST_MESSAGE } from "../actions/actions";

const initialState = {
  lastMessage: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAST_MESSAGE:
      return {
        ...state,
        lastMessage: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
