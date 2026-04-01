import { Link } from "react-router-dom";
import { FaBolt, FaHeart, FaTrophy, FaLeaf } from "react-icons/fa";
import { usePoolPreview } from "../hooks/usePoolPreview";
import { useCharityDirectory } from "../hooks/useCharityDirectory";
import "../styles/pages/landing.css";

export default function Landing() {
  const pool = usePoolPreview();
  const { items: spotlight } = useCharityDirectory({ featuredOnly: true });

  return (
    <div className="page page-landing">
      <div className="container hero">
        <div className="hero-card">
          <div className="pill warm">
            <FaHeart aria-hidden /> Membership that fuels impact
          </div>

          <h1>
            Play with purpose.
            <br />
            Lift communities.
            <br />
            Celebrate wins together.
          </h1>

          <p>
            A subscription platform built around generosity — not fairway clichés. Track your Stableford journey, fund
            trusted partners, and join a monthly draw shaped by real participation. The interface stays warm, modern,
            and human.
          </p>

          <div className="row hero-cta">
            <Link className="btn primary" to="/register">
              <FaBolt aria-hidden /> Begin membership
            </Link>
            <Link className="btn" to="/charity">
              <FaLeaf aria-hidden /> Meet partners
            </Link>
            <Link className="btn" to="/login">
              Sign in
            </Link>
          </div>
        </div>

        {spotlight.length > 0 ? (
          <div className="card surface-inner spotlight-card">
            <strong className="impact-label">Spotlight partners</strong>
            <p className="subtitle lead spotlight-lead">
              Curated by your team — each profile tells a story and surfaces upcoming moments like golf days and
              fundraisers.
            </p>
            <div className="grid grid-2 spotlight-grid">
              {spotlight.map((c) => (
                <article key={c._id} className="card soft lift spotlight-article">
                  <div className="row">
                    <strong>{c.name}</strong>
                    <Link className="btn small" to={`/charity/${c._id}`}>
                      View profile
                    </Link>
                  </div>
                  <p className="subtitle">
                    {c.description?.slice(0, 140)}
                    {(c.description?.length || 0) > 140 ? "…" : ""}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid grid-2 two-up">
          <div className="card soft surface-inner lift">
            <div className="row">
              <strong>Gentle score ritual</strong>
              <span className="pill subtle">
                <FaTrophy aria-hidden /> Last five rounds
              </span>
            </div>
            <p className="subtitle lead">
              Stableford entries with dates, always sorted newest-first. The product keeps only what matters — five
              living memories of how you showed up.
            </p>
          </div>
          <div className="card soft surface-inner lift">
            <div className="row">
              <strong>Transparent draws</strong>
              <span className="pill warm">3 / 4 / 5 match</span>
            </div>
            <p className="subtitle lead">
              Random or score-informed engines, optional rehearsal drafts, and publishing when you are ready. Prize pools
              follow a fixed, documented split with jackpot rollover.
            </p>
          </div>
        </div>

        <div className="card accent-border surface-inner pool-section">
          <strong className="impact-label">Collective prize pool</strong>
          <p className="subtitle lead">
            Every active member contributes a defined slice. Tier splits stay predictable: 40% / 35% / 25% with the top
            tier carrying jackpots forward when no one lands a perfect match.
          </p>
          {pool ? (
            <div className="grid pool-stats">
              <div className="row">
                <span className="subtitle">Active memberships</span>
                <strong>{pool.activeSubscriberCount}</strong>
              </div>
              <div className="row">
                <span className="subtitle">This month&apos;s base pool</span>
                <strong>₹{Math.round(pool.basePool || 0)}</strong>
              </div>
              <div className="row">
                <span className="subtitle">Jackpot rollover</span>
                <strong>₹{Math.round(pool.jackpotRollover || 0)}</strong>
              </div>
              <div className="row">
                <span className="subtitle">Tier totals (3 · 4 · 5)</span>
                <strong>
                  ₹{Math.round(pool.tiers?.[3]?.amount || 0)} · ₹{Math.round(pool.tiers?.[4]?.amount || 0)} · ₹
                  {Math.round(pool.tiers?.[5]?.amountTotal || 0)}
                </strong>
              </div>
            </div>
          ) : (
            <p className="subtitle pool-fallback">Live figures appear when the API is connected.</p>
          )}
        </div>

        <div className="card soft surface-inner steps-section">
          <strong>How the rhythm works</strong>
          <div className="grid steps">
            <div className="subtitle">1) Choose a partner at signup — at least 10% of membership can flow to them.</div>
            <div className="subtitle">2) Keep five dated scores alive so draws reflect who you are right now.</div>
            <div className="subtitle">3) Admins run and optionally draft rounds; publishing unlocks transparency.</div>
            <div className="subtitle">4) Winners verify with platform screenshots; approvals unlock orderly payouts.</div>
          </div>
          <div className="row steps-cta">
            <Link className="btn primary" to="/register">
              Start the flow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
