export const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";

export const updateLastMessage = (roomId: string, message: string) => ({
  type: UPDATE_LAST_MESSAGE,
  payload: { roomId, message },
});
