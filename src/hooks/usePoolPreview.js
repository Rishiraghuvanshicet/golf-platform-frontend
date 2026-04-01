import { useEffect, useState } from "react";
import { drawApi } from "../api/drawApi";

export function usePoolPreview() {
  const [pool, setPool] = useState(null);
  useEffect(() => {
    drawApi
      .poolPreview()
      .then((r) => setPool(r.data))
      .catch(() => setPool(null));
  }, []);
  return pool;
}
