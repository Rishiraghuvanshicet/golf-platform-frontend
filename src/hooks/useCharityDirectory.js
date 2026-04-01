import { useCallback, useEffect, useState } from "react";
import { charityApi } from "../api/charityApi";

export function useCharityDirectory({ search = "", category = "all", featuredOnly = false } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search && search.trim()) params.search = search.trim();
      if (category && category !== "all") params.category = category;
      if (featuredOnly) params.featured = "true";
      const { data } = await charityApi.list(params);
      setItems(data || []);
    } catch (e) {
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, featuredOnly]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}
