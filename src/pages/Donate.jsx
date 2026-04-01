import { useState } from "react";
import { Link } from "react-router-dom";
import { useCharityDirectory } from "../hooks/useCharityDirectory";
import { useDonations } from "../hooks/useDonations";
import "../styles/pages/donate.css";

export default function Donate() {
  const { items: charities } = useCharityDirectory({});
  const { items: history, donate } = useDonations();
  const [charityId, setCharityId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="page page-donate">
      <div className="container">
        <h2 className="title">Independent donation</h2>
        <p className="subtitle intro">
          A one-off gift — not tied to draws or gameplay. Your subscription charity percentage is separate.
        </p>

        <div className="grid grid-2 grid-main">
          <div className="card">
            <strong>Make a donation</strong>
            <div className="field field-first">
              <div className="label">Charity</div>
              <select value={charityId} onChange={(e) => setCharityId(e.target.value)}>
                <option value="">Select</option>
                {charities.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <div className="label">Amount (₹)</div>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500"
              />
            </div>
            <div className="field">
              <div className="label">Note (optional)</div>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="In memory of…" />
            </div>
            <button
              className="btn primary mt-4"
              type="button"
              onClick={() => donate({ charityId, amount, note })}
            >
              Donate
            </button>
          </div>

          <div className="card">
            <strong>Your recent donations</strong>
            {!history.length ? (
              <p className="subtitle history-empty">No donations yet.</p>
            ) : (
              <ul className="history-list">
                {history.map((d) => (
                  <li key={d._id} className="subtitle">
                    ₹{d.amount} — {d.charityId?.name || "Charity"} —{" "}
                    {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Link className="btn back-link" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
