import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { drawApi } from "../api/drawApi";
import { userApi } from "../api/userApi";

export function useDrawPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows } = await drawApi.list();
      setData(rows);
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to load draws (login required)");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    userApi.me().then((r) => setMe(r.data)).catch(() => setMe(null));
    load();
  }, [load]);

  const runDraw = async (body) => {
    await drawApi.run(body);
    if (!body?.numbers) {
      if (body?.simulate) toast.success("Draft draw saved — publish when ready");
      else toast.success("Draw completed and published");
    }
    await load();
  };

  const publishDraw = async (id) => {
    await drawApi.publish(id);
    toast.success("Draw published — visible to subscribers");
    await load();
  };

  return { data, loading, me, reload: load, runDraw, publishDraw };
}
