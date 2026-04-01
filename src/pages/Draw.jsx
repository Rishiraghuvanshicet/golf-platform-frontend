import { useEffect, useState } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";

export default function Draw() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/draw")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      {data.map((d, i) => (
        <div key={i} className="card">
          {d.numbers.join(", ")}
        </div>
      ))}
    </div>
  );
}