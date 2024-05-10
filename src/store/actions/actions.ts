// Action Types
export const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";

// Action Creator
export const updateLastMessage = (message) => ({
  type: UPDATE_LAST_MESSAGE,
  payload: message,
});
