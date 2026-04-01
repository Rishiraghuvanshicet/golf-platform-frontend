import { useCallback, useEffect, useState } from "react";
import { charityApi } from "../api/charityApi";

export function useCharityDetail(id) {
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) {
      setCharity(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await charityApi.getById(id);
      setCharity(data);
    } catch (e) {
      setError(e);
      setCharity(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { charity, loading, error, reload: load };
}
