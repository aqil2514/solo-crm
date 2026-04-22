import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");

      return data;
    },
  });
  return user;
}
