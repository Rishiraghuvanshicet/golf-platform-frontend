import { useMemo } from "react";
import { useScores } from "../hooks/useScores";
import "../styles/pages/score-form.css";

const ScoreForm = () => {
  const {
    scores,
    loading,
    score,
    setScore,
    date,
    setDate,
    editingId,
    setEditingId,
    reload,
    submitAdd,
    startEdit,
    saveEdit,
    remove,
  } = useScores();

  const canSubmit = useMemo(() => score !== "" && Boolean(date && String(date).trim()), [score, date]);

  return (
    <div className="grid score-form">
      <div className="card soft">
        <div className="row panel-head">
          <div>
            <strong>Stableford scores</strong>
            <div className="subtitle panel-intro">Your latest 5 scores are kept automatically.</div>
          </div>
          <button className="btn small" type="button" onClick={reload}>
            Refresh
          </button>
        </div>

        <div className="grid grid-2 inputs">
          <div className="field">
            <div className="label">Score (1–45)</div>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="e.g. 34"
              min={1}
              max={45}
            />
          </div>
          <div className="field">
            <div className="label">Round date (required)</div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>

        <div className="row actions">
          {editingId ? (
            <>
              <button className="btn success" type="button" disabled={!canSubmit} onClick={saveEdit}>
                Save edit
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setEditingId("");
                  setScore("");
                  setDate(new Date().toISOString().slice(0, 10));
                }}
              >
                Cancel edit
              </button>
            </>
          ) : (
            <button className="btn primary" type="button" disabled={!canSubmit} onClick={submitAdd}>
              Add score
            </button>
          )}
          <span className="subtitle hint">Tip: Add 5 scores to maximize your draw profile.</span>
        </div>
      </div>

      <div className="card">
        <strong>Recent</strong>
        <div className="subtitle recent">{loading ? "Loading..." : `${scores.length} score(s)`}</div>
        <div className="recent-list">
          {scores.length === 0 ? (
            <div className="subtitle">No scores yet.</div>
          ) : (
            <div className="grid recent-grid">
              {scores.map((s) => (
                <div key={s._id} className="card soft score-row">
                  <div>
                    <div className="score-value">{s.value}</div>
                    <div className="subtitle score-date">
                      {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                    </div>
                  </div>
                  <div className="row">
                    <button className="btn small" type="button" onClick={() => startEdit(s)}>
                      Edit
                    </button>
                    <button className="btn small danger" type="button" onClick={() => remove(s._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreForm;
