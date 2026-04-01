import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { winnerApi } from "../api/winnerApi";

export function useWinners() {
  const [data, setData] = useState([]);
  const [proof, setProof] = useState({});

  const load = useCallback(async () => {
    try {
      const { data: rows } = await winnerApi.mine();
      setData(rows);
    } catch {
      setData([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submitProof = async (winnerId) => {
    const val = proof[winnerId] || data.find((w) => w._id === winnerId)?.proofImage;
    try {
      await winnerApi.uploadProof({ winnerId, proofImage: val });
      toast.success("Proof submitted — pending admin review");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Upload failed");
    }
  };

  return { data, proof, setProof, reload: load, submitProof };
}
