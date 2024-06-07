/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/messageReducer.js

import { UPDATE_LAST_MESSAGE } from "./action";

const initialState = {
  lastMessages: {},
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LAST_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const { roomId, message, sendAt } = action.payload;
      return {
        ...state,
        lastMessages: {
          ...state.lastMessages,
          [roomId]: { message, sendAt }, // Stocker un objet avec message et sendAt
        },
      };
    default:
      return state;
  }
};

export default messageReducer;
