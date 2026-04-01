import { useCallback, useEffect, useState } from "react";
import { userApi } from "../api/userApi";

export function useCurrentUser() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setMe(null);
      setLoading(false);
      return null;
    }
    setLoading(true);
    try {
      const { data } = await userApi.me();
      setMe(data);
      return data;
    } catch {
      setMe(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const onAuth = () => refetch();
    window.addEventListener("auth:changed", onAuth);
    window.addEventListener("storage", onAuth);
    return () => {
      window.removeEventListener("auth:changed", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, [refetch]);

  return { me, loading, refetch, setMe };
}
