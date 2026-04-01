import API from "../api/axios";
import { toast } from "react-toastify";

export default function Subscription() {

  const subscribe = async (plan) => {
    await API.post("/subscription", { plan:"monthly" });
    toast.success("Subscribed");
  };

  return (
    <div className="container">
      <button onClick={()=>subscribe("monthly")}>Monthly</button>
      <button onClick={()=>subscribe("yearly")}>Yearly</button>
    </div>
  );
}