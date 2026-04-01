import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const ScoreForm = () => {
  const [score, setScore] = useState("");

  const submit = async () => {
    try {
      await API.post("/score/", { score });
      toast.success("Score added");
    } catch {
      toast.error("Error");
    }
  };

  return (
    <div>
      <input type="number" onChange={(e) => setScore(e.target.value)} />
      <button onClick={submit}>Add Score</button>
    </div>
  );
};

export default ScoreForm;