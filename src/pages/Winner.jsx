import { useWinners } from "../hooks/useWinners";
import "../styles/pages/winner.css";

export default function Winner() {
  const { data, proof, setProof, submitProof } = useWinners();

  return (
    <div className="page page-winner">
      <div className="container">
        <h2 className="title">My winnings</h2>
        <p className="subtitle intro">
          Verification applies to winners only. Upload a screenshot or link showing your Stableford scores from this
          platform. An administrator approves or rejects; payment moves from pending to paid after approval and payout.
        </p>

        <div className="grid win-list">
          {data.length === 0 ? (
            <div className="card">
              <div className="subtitle">No winnings yet.</div>
            </div>
          ) : (
            data.map((w) => (
              <div key={w._id} className="card surface-inner lift">
                <div className="row win-head">
                  <strong>
                    Match: {w.match} • Prize: ₹{w.prize}
                  </strong>
                  <span className="pill warm">
                    Payment: {w.paymentStatus || "pending"} · Review: {w.status || "pending"}
                  </span>
                </div>
                {w.draw?.createdAt ? (
                  <p className="subtitle faint win-card__meta">
                    Round date: {new Date(w.draw.createdAt).toLocaleDateString()}
                    {Array.isArray(w.draw.numbers) ? ` · Numbers: ${w.draw.numbers.join(" · ")}` : ""}
                  </p>
                ) : null}

                <div className="grid win-card__proof">
                  <div className="field">
                    <div className="label">Proof — URL to screenshot of your scores on this app</div>
                    <input
                      value={proof[w._id] ?? w.proofImage ?? ""}
                      onChange={(e) => setProof((p) => ({ ...p, [w._id]: e.target.value }))}
                      placeholder="https://… or image host link"
                    />
                  </div>

                  <div className="row win-actions">
                    <button className="btn primary" type="button" onClick={() => submitProof(w._id)}>
                      Submit proof
                    </button>
                    <span className="subtitle">
                      Flow: pending review → approved/rejected → when approved, admin marks paid.
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
