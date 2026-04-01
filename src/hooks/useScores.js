import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { scoreApi } from "../api/scoreApi";

export function useScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [editingId, setEditingId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await scoreApi.mine();
      setScores(data.scores || []);
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to load scores");
      setScores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submitAdd = async () => {
    if (!date || String(date).trim() === "") {
      toast.error("Pick a date for this round (required)");
      return;
    }
    try {
      await scoreApi.add({ score: Number(score), date });
      toast.success("Score added");
      setScore("");
      setDate(new Date().toISOString().slice(0, 10));
      load();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Could not add score (need active subscription)");
    }
  };

  const startEdit = (s) => {
    setEditingId(s._id);
    setScore(String(s.value));
    setDate(s.date ? new Date(s.date).toISOString().slice(0, 10) : "");
  };

  const saveEdit = async () => {
    if (!date || String(date).trim() === "") {
      toast.error("Pick a date for this score (required)");
      return;
    }
    try {
      await scoreApi.update(editingId, { score: Number(score), date });
      toast.success("Score updated");
      setEditingId("");
      setScore("");
      setDate(new Date().toISOString().slice(0, 10));
      load();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Update failed");
    }
  };

  const remove = async (id) => {
    try {
      await scoreApi.remove(id);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Delete failed");
    }
  };

  return {
    scores,
    loading,
    score,
    setScore,
    date,
    setDate,
    editingId,
    setEditingId,
    reload: load,
    submitAdd,
    startEdit,
    saveEdit,
    remove,
  };
}
