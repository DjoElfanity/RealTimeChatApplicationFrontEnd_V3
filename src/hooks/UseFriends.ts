import axios from "axios";
import { useEffect, useState } from "react";
import {
  FriendRequestType,
  User,
  fetchFriendRequests,
  fetchFriendsByUserId,
} from "../api/UserApi";

export const useFriends = (userId: string, token: string) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequestType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const source = axios.CancelToken.source();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const requestsData = await fetchFriendRequests(userId, token, source);
      setRequests(requestsData);
      if (requestsData.length === 0) {
        setError(null); // Si la liste est vide, ce n'est pas une erreur
      }
      setLoading(false);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Failed to fetch friend requests data");
        setLoading(false);
      }
    }
  };

  const fetchFriends = async () => {
    try {
      const friendsData = await fetchFriendsByUserId(userId, token, source);
      setFriends(friendsData);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Failed to fetch friends data");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchFriendsByUserId(userId, token, source)
        .then((friendsData) => {
          setFriends(friendsData);
          return fetchRequests(); // Fetch requests after friends are loaded
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            setError("Failed to fetch data");
          }
          setLoading(false);
        });
      setLoading(false);
    };
    fetchData();

    return () => source.cancel("Component unmounted");
  }, [userId, token]);

  return {
    friends,
    requests,
    loading,
    error,
    refetchRequests: fetchRequests,
    refetchFriends: fetchFriends,
  };
};
