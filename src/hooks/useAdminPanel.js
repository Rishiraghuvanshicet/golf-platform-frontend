import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { adminApi } from "../api/adminApi";
import { charityApi } from "../api/charityApi";
import { drawApi } from "../api/drawApi";
import { winnerApi } from "../api/winnerApi";

export function useAdminPanel() {
  const [me, setMe] = useState(null);
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [subs, setSubs] = useState([]);
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = useMemo(() => me?.role === "admin", [me]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const meRes = await userApi.me();
      setMe(meRes.data);

      const [sumRes, usersRes, winnersRes, subsRes, charitiesRes] = await Promise.all([
        adminApi.summary(),
        adminApi.users(),
        adminApi.winners(),
        adminApi.subscriptions(),
        charityApi.list(),
      ]);
      setSummary(sumRes.data);
      setUsers(usersRes.data || []);
      setWinners(winnersRes.data || []);
      setSubs(subsRes.data || []);
      setCharities(charitiesRes.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runDraw = async (body) => {
    await drawApi.run(body);
    if (body?.numbers) {
      if (body?.simulate) toast.success("Draft test draw saved");
      else toast.success("Test draw completed");
    } else if (body?.simulate) {
      toast.success("Draft draw saved — publish when ready");
    } else {
      toast.success("Draw completed and published");
    }
    await load();
  };

  const updateUserRole = async (id, nextRole) => {
    await adminApi.updateUser(id, { role: nextRole });
    toast.success(`Role updated to ${nextRole}`);
    await load();
  };

  const approveWinner = async (id, body) => {
    await winnerApi.approve(id, body);
    await load();
  };

  const updateSub = async (id, body) => {
    await adminApi.updateSubscription(id, body);
    await load();
  };

  const setFeaturedCharity = async (id) => {
    await charityApi.feature(id);
    toast.success("Featured charity selected");
    await load();
  };

  return {
    me,
    summary,
    users,
    winners,
    subs,
    charities,
    loading,
    isAdmin,
    reload: load,
    runDraw,
    updateUserRole,
    approveWinner,
    updateSub,
    setFeaturedCharity,
  };
}
