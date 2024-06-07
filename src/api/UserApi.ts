import axios, { CancelTokenSource } from "axios";

const BASE_URL = "http://localhost:5150/api/";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequestType {
  id: string;
  requesterId: string;
  requesterEmail: string;
  recipientId: string;
  recipientEmail: string;
  requestDate: string;
  friendsStatus: string; // "Pending", "Accepted", etc.
}

export const fetchUsersById = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<User> => {
  if (!userId) throw new Error("UserID is required");

  const url = `${BASE_URL}User/${userId}`;

  const response = await axios.get<User>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  });

  return response.data;
};

export const fetchUserPseudo = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<string> => {
  const user = await fetchUsersById(userId, token, source);
  return `${user.firstName} ${user.lastName}`;
};

// FRIENDS
export const fetchFriendsByUserId = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<User[]> => {
  if (!userId) throw new Error("UserID is required");

  const url = `${BASE_URL}Friend?UserId=${userId}`;

  const response = await axios.get<User[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  });

  return response.data;
};

export const fetchFriendRequests = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<FriendRequestType[]> => {
  const url = `${BASE_URL}Friend/requests?UserId=${userId}`;
  const response = await axios.get<FriendRequestType[]>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  });

  return response.data;
};

export const acceptFriendRequest = async (
  friendRequestId: string,
  requesterId: string,
  recipientId: string,
  token: string,
  source: CancelTokenSource
): Promise<void> => {
  const url = `${BASE_URL}Friend/accept`;

  await axios.post(
    url,
    {
      friendRequestId,
      requesterId,
      recipientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
  );
};

export const rejectFriendRequest = async (
  friendRequestId: string,
  recipientId: string,
  token: string,
  source: CancelTokenSource
): Promise<void> => {
  const url = `${BASE_URL}Friend/reject`;

  await axios.post(
    url,
    {
      friendRequestId,
      recipientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
  );
};
