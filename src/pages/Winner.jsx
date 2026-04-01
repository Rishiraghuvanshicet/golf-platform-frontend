import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Winner() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    API.get("/winner/my").then(res=>setData(res.data));
  },[]);

  return (
    <div className="container">
      <h2>My Winnings</h2>

      {data.map(w=>(
        <div className="card">
          Match: {w.match} | Prize: ₹{w.prize}
        </div>
      ))}
    </div>
  );
}