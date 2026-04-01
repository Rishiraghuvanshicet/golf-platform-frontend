import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { subscriptionApi } from "../api/subscriptionApi";
import { drawApi } from "../api/drawApi";
import { winnerApi } from "../api/winnerApi";

export function useDashboard() {
  const [me, setMe] = useState(null);
  const [sub, setSub] = useState(null);
  const [draws, setDraws] = useState([]);
  const [winnings, setWinnings] = useState([]);

  const load = useCallback(async () => {
    try {
      const [u, s, dr, win] = await Promise.all([
        userApi.me(),
        subscriptionApi.me(),
        drawApi.list().catch(() => ({ data: [] })),
        winnerApi.mine().catch(() => ({ data: [] })),
      ]);
      setMe(u.data);
      setSub(s.data);
      setDraws(Array.isArray(dr.data) ? dr.data : []);
      setWinnings(Array.isArray(win.data) ? win.data : []);
    } catch {
      setMe(null);
      setSub(null);
      setDraws([]);
      setWinnings([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveProfile = async (payload) => {
    try {
      const { data } = await userApi.updateMe(payload);
      setMe(data);
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Save failed");
    }
  };

  const participation = useMemo(() => {
    const publishedRounds = draws.filter((d) => d.published !== false).length;
    const totalWon = winnings.reduce((acc, w) => {
      if (w.paymentStatus === "paid") return acc + (Number(w.prize) || 0);
      return acc;
    }, 0);
    const pendingPayouts = winnings.filter(
      (w) => w.status === "approved" && w.paymentStatus === "pending"
    ).length;
    const pendingVerification = winnings.filter((w) => w.status === "pending").length;
    return {
      publishedRounds,
      totalWon,
      pendingPayouts,
      pendingVerification,
      winCount: winnings.length,
    };
  }, [draws, winnings]);

  return { me, setMe, sub, draws, winnings, participation, reload: load, saveProfile };
}
