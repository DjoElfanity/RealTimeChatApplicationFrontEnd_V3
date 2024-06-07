import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useFriends } from "../../hooks/UseFriends";
import SideBarHeader from "../Common/SideBarHeader";
import FriendItem from "./FriendItem";
import FriendRequest from "./FriendRequest";

const Friends: React.FC = () => {
  const { userId } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchedToken = localStorage.getItem("token");
    setToken(fetchedToken);
  }, []);

  const { friends, requests, loading, error, refetchRequests, refetchFriends } =
    useFriends(userId as string, token as string);

  // Déplacer l'état des demandes d'amis ici
  const [localRequests, setLocalRequests] = useState<FriendRequest[]>(requests);

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const removeRequest = (id: string) => {
    setLocalRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  return (
    <div className="max-h-[calc(100vh)] overflow-y-hidden">
      <SideBarHeader header="Friends" />
      <p className="my-4 font-semibold px-2">List of friends:</p>
      {loading && <div>Loading...</div>}
      {error && error !== "Failed to fetch friend requests data" && (
        <div>Error: {error}</div>
      )}
      <div className="custom-scroll max-h-[75vh] overflow-y-auto p-2">
        <div className="flex flex-col items-center gap-3 w-full">
          {friends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
          <p className="my-4 font-semibold px-2">Friend requests:</p>
          {localRequests.length === 0 && <div>{/* No friend requests */}</div>}
          {localRequests.map((request) => (
            <FriendRequest
              key={request.id}
              friendRequest={request}
              refetchRequests={refetchRequests}
              refetchFriends={refetchFriends}
              removeRequest={removeRequest}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
