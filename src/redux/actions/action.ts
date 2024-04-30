export const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";
export const updateLastMessage = (
  roomId: string,
  message: string,
  sendAt: string
) => ({
  type: UPDATE_LAST_MESSAGE,
  payload: { roomId, message, sendAt },
});
