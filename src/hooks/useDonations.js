import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { donationApi } from "../api/donationApi";

export function useDonations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await donationApi.mine();
      setItems(data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const donate = async ({ charityId, amount, note }) => {
    if (!charityId) {
      toast.error("Select a charity");
      return;
    }
    const n = Number(amount);
    if (!Number.isFinite(n) || n < 1) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await donationApi.create({ charityId, amount: n, note });
      toast.success("Thank you — independent donation recorded");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Donation failed");
    }
  };

  return { items, loading, reload: load, donate };
}
