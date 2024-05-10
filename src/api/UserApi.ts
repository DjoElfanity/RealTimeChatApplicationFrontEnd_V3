import axios, { CancelTokenSource } from "axios";

const BASE_URL = "http://localhost:5150/api/User/";

/*
{
    "id": "65fc48a2ee4edeb5537f1c8e",
    "firstName": "jad",
    "lastName": "string",
    "email": "jadfanity22@gmail.com",
    "status": "Offline",
    "createdAt": "2024-03-21T14:48:02.694Z",
    "updatedAt": "2024-03-21T14:48:02.694Z"
  },


*/

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchUsersById = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<User> => {
  if (!userId) throw new Error("UserID is required");

  // Correctement ajouter l'identifiant de l'utilisateur à l'URL
  const url = `${BASE_URL}${userId}`; // Assurez-vous que cela forme l'URL correcte, comme http://localhost:5150/api/User/{userId}

  const response = await axios.get<User>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cancelToken: source.token,
  });

  return response.data;
};

// je veux creer une fonction qui va utiliser le fetchUserById qui prendra en parametre  ce qu'il faut et qui me retournera le firstname lastname
export const fetchUserPseudo = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<string> => {
  const user = await fetchUsersById(userId, token, source);
  return `${user.firstName} ${user.lastName}`;
};
