import { useQuery } from "react-query";
import api from "../api"; // Axios instance

export function useProfileData(userId) {
  return useQuery(
    ["profile", userId], // Include userId in the query key
    async () => {
      const endpoint = userId ? `/user/${userId}` : "/api/data"; // Fetch data for the specified user or the logged-in user
      const response = await api.get(endpoint);
      return response.data;
    },
    {
      enabled: !!userId || true, // Always run the query
    }
  );
}