import { useEffect, useState } from "react";
import { verifyUser } from "../api/authApi";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await verifyUser();
        setUser(data.user || null);
      } catch (e) {
        console.log("Failed to verify user", e);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
