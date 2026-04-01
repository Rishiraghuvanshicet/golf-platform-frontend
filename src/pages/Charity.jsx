import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Charity() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    API.get("/charity").then(res=>setData(res.data));
  },[]);

  return (
    <div className="container">
      <h2>Charities</h2>

      {data.map(c=>(
        <div className="card">
          {c.name}
        </div>
      ))}
    </div>
  );
}