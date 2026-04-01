import { Link } from "react-router-dom";
import ScoreForm from "../components/ScoreForm";
import { useDashboard } from "../hooks/useDashboard";
import { useCharityDirectory } from "../hooks/useCharityDirectory";
import "../styles/pages/dashboard.css";

export default function Dashboard() {
  const { me, setMe, sub, participation, saveProfile } = useDashboard();
  const { items: charities } = useCharityDirectory({});

  return (
    <div className="page page-dashboard">
      <div className="container">
        <div className="page-head--split">
          <div>
            <p className="impact-label">Your home base</p>
            <h2 className="title title-tight">Impact, scores, and membership</h2>
            <p className="subtitle lead lead-spaced">
              Everything the brief asks for: subscription health, rolling Stableford history, charity choice, draw
              participation, and winnings status — expressed through a calm, purposeful layout.
            </p>
          </div>
          <div className="page-head__actions">
            <Link className="btn small" to="/subscription">
              Subscription
            </Link>
            <Link className="btn small primary" to="/donate">
              Donate
            </Link>
            <Link className="btn small" to="/draw">
              Draws
            </Link>
            <Link className="btn small" to="/winner">
              Winnings
            </Link>
          </div>
        </div>

        <div className="grid grid-3 mt-6">
          <div className="card surface-inner lift">
            <strong className="impact-label">Membership</strong>
            <div className="subtitle metrics-line">
              <strong className="stat-strong">{sub?.status ? sub.status : "Not active"}</strong>
              {sub?.expiryDate ? ` · renews ${new Date(sub.expiryDate).toLocaleDateString()}` : ""}
              {sub?.plan ? ` · ${sub.plan}` : ""}
            </div>
            {!sub || sub.status !== "active" ? (
              <div className="row card-actions">
                <Link className="btn success" to="/subscription">
                  Activate membership
                </Link>
              </div>
            ) : null}
          </div>

          <div className="card surface-inner lift">
            <strong className="impact-label">Draw participation</strong>
            <p className="subtitle metrics-line">
              <strong className="stat-strong">{participation.publishedRounds}</strong> published rounds on record.
            </p>
            <p className="subtitle faint metrics-line--tight">
              Upcoming: we follow a gentle monthly cadence — stay subscribed and keep five fresh scores to remain in the
              story.
            </p>
          </div>

          <div className="card surface-inner lift accent-border">
            <strong className="impact-label">Winnings</strong>
            <p className="subtitle metrics-line">
              <strong className="stat-strong">₹{Math.round(participation.totalWon || 0)}</strong> paid to you so far ·{" "}
              <strong className="stat-strong">{participation.winCount}</strong> prize line
              {participation.winCount === 1 ? "" : "s"}
            </p>
            <p className="subtitle faint metrics-line--tight">
              {participation.pendingVerification > 0
                ? `${participation.pendingVerification} awaiting proof / review · `
                : ""}
              {participation.pendingPayouts > 0
                ? `${participation.pendingPayouts} approved, payout pending`
                : "No payout holds"}
            </p>
            <Link className="btn small footer-link" to="/winner">
              Open winnings
            </Link>
          </div>
        </div>

        <div className="grid grid-2 mt-6">
          <div className="card surface-inner">
            <strong className="impact-label">Profile &amp; chosen partner</strong>
            <div className="grid mt-4">
              <div className="field">
                <div className="label">Preferred name</div>
                <input
                  value={me?.name || ""}
                  onChange={(e) => setMe((m) => ({ ...(m || {}), name: e.target.value }))}
                  placeholder="How we greet you"
                />
              </div>
              <div className="field">
                <div className="label">Partner from directory</div>
                <select
                  value={me?.charityId?._id || me?.charityId || ""}
                  onChange={(e) =>
                    setMe((m) => ({
                      ...(m || {}),
                      charityId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select</option>
                  {charities.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <div className="label">Giving rate — min 10% of membership fee</div>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={me?.charityPercentage ?? 10}
                  onChange={(e) =>
                    setMe((m) => ({
                      ...(m || {}),
                      charityPercentage: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="row">
                <button
                  className="btn primary"
                  type="button"
                  onClick={() =>
                    saveProfile({
                      name: me?.name,
                      charityId: me?.charityId?._id || me?.charityId,
                      charityPercentage: me?.charityPercentage,
                    })
                  }
                >
                  Save profile
                </button>
              </div>
            </div>
          </div>

          <div className="card soft surface-inner">
            <strong>Why this screen exists</strong>
            <p className="subtitle why-text">
              The brief centres on feeling — generosity, transparency, and a modern rhythm. Your scores fuel fair draws;
              your subscription seeds impact; this dashboard keeps both legible without looking like a historic golf club
              brochure.
            </p>
          </div>
        </div>

        <div className="score-slot">
          <ScoreForm />
        </div>
      </div>
    </div>
  );
}
