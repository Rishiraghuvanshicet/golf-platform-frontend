import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCharityDetail } from "../hooks/useCharityDetail";
import Loader from "../components/Loader";
import "../styles/pages/charity-detail.css";

const SEO_TITLE_SUFFIX = "Golf for Good — Play with purpose";

const eventTypeLabel = (t) => {
  switch (t) {
    case "golf_day":
      return "Charity golf day";
    case "fundraiser":
      return "Fundraiser";
    case "community":
      return "Community";
    default:
      return "Event";
  }
};

export default function CharityDetail() {
  const { id } = useParams();
  const { charity, loading } = useCharityDetail(id);

  const sortedEvents = useMemo(() => {
    const list = charity?.events || [];
    return [...list]
      .filter((e) => e.title)
      .sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return da - db;
      });
  }, [charity]);

  useEffect(() => {
    if (!charity?.name) return;
    document.title = `${charity.name} | ${SEO_TITLE_SUFFIX}`;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    const desc = charity.description
      ? String(charity.description).slice(0, 160)
      : "Partner profile, upcoming moments, and ways to support meaningful impact.";
    el.setAttribute("content", desc);
  }, [charity]);

  if (loading) return <Loader />;
  if (!charity) {
    return (
      <div className="page page-charity-detail">
        <div className="container">
          <div className="card not-found">
            <p className="subtitle">This partner page could not be found.</p>
            <Link className="btn" to="/charity">
              Back to directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-charity-detail">
      <div className="container">
        <div className="row detail-head">
          <div>
            <p className="impact-label">Partner profile</p>
            <h1 className="title title-tight">{charity.name}</h1>
            <p className="subtitle lead">
              {charity.category ? `${charity.category} · ` : ""}
              Your subscription can fund work like this every month.
            </p>
          </div>
          {charity.featured ? <span className="pill warm">Spotlight partner</span> : null}
        </div>

        {charity.image ? (
          <div className="hero-media">
            <img src={charity.image} alt="" className="cover-img" />
          </div>
        ) : null}

        <div className="card surface-inner impact-card">
          <strong className="impact-label">Impact</strong>
          <p className="subtitle lead impact-text">
            {charity.description || "We are adding a fuller story for this partner soon."}
          </p>
        </div>

        <div className="events-section">
          <h2 className="section-title">What is coming up</h2>
          <p className="subtitle events-intro">Save the dates — from relaxed golf days to community fundraisers.</p>
          {!sortedEvents.length ? (
            <div className="card soft surface-inner events-empty">
              <p className="subtitle">
                No public events yet. Check back soon or explore another partner in the directory.
              </p>
            </div>
          ) : (
            <ul className="event-timeline">
              {sortedEvents.map((ev) => (
                <li key={ev._id || `${ev.title}-${ev.date}`} className="event-card lift">
                  <div className="event-card__meta">
                    <span className="pill subtle">{eventTypeLabel(ev.type)}</span>
                    {ev.date ? (
                      <time dateTime={new Date(ev.date).toISOString()} className="event-date">
                        {new Date(ev.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    ) : (
                      <span className="event-date muted">Date TBC</span>
                    )}
                  </div>
                  <h3 className="event-title">{ev.title}</h3>
                  {ev.description ? <p className="subtitle event-desc">{ev.description}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="row cta-row">
          <Link className="btn" to="/charity">
            ← All partners
          </Link>
          <Link className="btn primary" to="/register">
            Create an account &amp; pick a partner
          </Link>
          <Link className="btn success" to="/donate">
            One-off donation
          </Link>
        </div>
      </div>
    </div>
  );
}
