import { useQuery } from "react-query";
import api from "../api"; // Axios instance

export function useProfileDetails(userId) {
  return useQuery(
    ["details", userId], // Include userId in the query key
    async () => {
      const endpoint = userId ? `/user/${userId}/details` : "/api/details"; // Fetch details for the specified user or the logged-in user
      const response = await api.get(endpoint);
      return response.data;
    },
    {
      enabled: !!userId || true, // Always run the query
    }
  );
}