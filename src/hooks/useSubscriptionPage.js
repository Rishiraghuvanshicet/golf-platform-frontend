import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { subscriptionApi } from "../api/subscriptionApi";

export function useSubscriptionPage() {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await subscriptionApi.me();
      setSub(data);
    } catch {
      setSub(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const subscribe = async (plan) => {
    await subscriptionApi.create(plan);
    toast.success("Subscription active");
    load();
  };

  const cancel = async () => {
    await subscriptionApi.cancel();
    toast.success("Subscription cancelled");
    load();
  };

  return { sub, loading, reload: load, subscribe, cancel };
}
