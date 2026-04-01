import { useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDrawPage } from "../hooks/useDrawPage";
import "../styles/pages/draw.css";

export default function Draw() {
  const { data, loading, me, reload, runDraw, publishDraw } = useDrawPage();
  const [mode, setMode] = useState("random");
  const [simulate, setSimulate] = useState(false);

  if (loading) return <Loader />;

  return (
    <div className="page page-draw">
      <div className="container">
        <div className="page-head">
          <h2 className="title">Draw results</h2>
          <p className="subtitle lead">
            Monthly moments when community scores meet the draw. Published rounds appear here; drafts stay admin-only
            until you are ready to share outcomes broadly.
          </p>
        </div>

        {me?.role === "admin" ? (
          <div className="card soft surface-inner admin-panel">
            <div className="row admin-head-row">
              <div>
                <strong className="impact-label">Administrator</strong>
                <p className="subtitle admin-intro">
                  Choose random or score-informed numbers. Use a draft run to rehearse; publish when you are ready for
                  members to see numbers and (for published runs) winnings.
                </p>
              </div>
              <button className="btn small" type="button" onClick={reload}>
                Refresh
              </button>
            </div>

            <div className="grid grid-2 admin-toolbar">
              <div className="field">
                <div className="label">Draw engine</div>
                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="random">Random — classic lottery style</option>
                  <option value="algorithmic">Algorithmic — weighted by member Stableford totals</option>
                </select>
              </div>
              <label className="check-card">
                <input
                  type="checkbox"
                  checked={simulate}
                  onChange={(e) => setSimulate(e.target.checked)}
                />
                <span>
                  <strong>Draft / simulation</strong>
                  <span className="subtitle block">
                    Hides this round from subscribers until you publish it. Jackpot math still updates — use thoughtfully.
                  </span>
                </span>
              </label>
            </div>

            <div className="row draw-card__publish">
              <button
                className="btn primary"
                type="button"
                onClick={async () => {
                  try {
                    await runDraw({ mode, simulate });
                  } catch (err) {
                    toast.error(err?.response?.data?.msg || "Run draw failed");
                  }
                }}
              >
                Run draw
              </button>
            </div>
          </div>
        ) : (
          <div className="card soft surface-inner info-card">
            <p className="subtitle">
              When your team has not published a round yet, this space stays calm — that is normal. Your eligible scores
              still stay on file for the next published draw.
            </p>
          </div>
        )}

        <div className="grid draw-list">
          {data.length === 0 ? (
            <div className="card">
              <div className="subtitle">No published or visible runs yet.</div>
            </div>
          ) : (
            data.map((d, i) => (
              <div key={d._id || i} className="card lift surface-inner">
                <div className="row draw-card-top">
                  <strong>Round #{data.length - i}</strong>
                  <div className="row draw-card-pills">
                    {d.published === false ? <span className="pill warn">Draft</span> : null}
                    <span className="pill subtle">
                      {d.drawMode === "algorithmic"
                        ? "Algorithmic"
                        : d.drawMode === "manual"
                          ? "Manual"
                          : "Random"}
                    </span>
                    <span className="pill warm">
                      {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "—"}
                    </span>
                  </div>
                </div>
                <div className="draw-balls draw-card__numbers">
                  {Array.isArray(d.numbers)
                    ? d.numbers.map((n, idx) => (
                        <span key={`${d._id}-${idx}`} className="draw-ball">
                          {n}
                        </span>
                      ))
                    : null}
                </div>
                <div className="subtitle draw-card__meta">
                  Community prizes connected: {Array.isArray(d.winners) ? d.winners.length : 0}
                </div>
                {d.prizePoolMeta ? (
                  <div className="subtitle draw-card__pool">
                    <div>
                      Pool base ₹{Math.round(d.prizePoolMeta.basePool || 0)} · active members{" "}
                      {d.prizePoolMeta.activeSubscriberCount ?? "—"}
                    </div>
                    <div>
                      Tiers · 3-match ₹{Math.round(d.prizePoolMeta.tier3Amount || 0)} · 4-match ₹
                      {Math.round(d.prizePoolMeta.tier4Amount || 0)} · 5-match ₹
                      {Math.round(d.prizePoolMeta.tier5AmountTotal || 0)} (rollover in ₹
                      {Math.round(d.prizePoolMeta.rolloverApplied || 0)})
                    </div>
                    <div>
                      Carried jackpot if no top match: ₹
                      {Math.round(d.prizePoolMeta.rolloverCarriedForward || 0)}
                    </div>
                  </div>
                ) : null}
                {me?.role === "admin" && d.published === false && d._id ? (
                  <div className="row draw-card__publish">
                    <button
                      className="btn small success"
                      type="button"
                      onClick={async () => {
                        try {
                          await publishDraw(d._id);
                        } catch (err) {
                          toast.error(err?.response?.data?.msg || "Publish failed");
                        }
                      }}
                    >
                      Publish to members
                    </button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
