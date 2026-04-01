import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useCharityDirectory } from "../hooks/useCharityDirectory";
import { useCharityAdminForm } from "../hooks/useCharityAdminForm";
import { charityApi } from "../api/charityApi";
import "../styles/pages/charity.css";

const CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "general", label: "General" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "youth", label: "Youth" },
  { value: "environment", label: "Environment" },
];

export default function Charity() {
  const { me } = useCurrentUser();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { items: data, reload } = useCharityDirectory({ search, category });
  const {
    form,
    setForm,
    events,
    EVENT_TYPES,
    addEventRow,
    removeEventRow,
    updateEvent,
    createCharity,
  } = useCharityAdminForm(reload);

  return (
    <div className="page page-charity">
      <div className="container">
        <div className="page-head">
          <h2 className="title">Charity directory</h2>
          <p className="subtitle lead">
            Discover partners doing meaningful work. Search, filter by cause, and open a profile for stories, imagery,
            and what is coming up next — including golf days and fundraisers.
          </p>
        </div>

        <div className="card soft surface-inner filters">
          <div className="grid grid-2">
            <div className="field">
              <div className="label">Search</div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name or mission keywords"
              />
            </div>
            <div className="field">
              <div className="label">Category</div>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {me?.role === "admin" ? (
          <div className="card accent-border surface-inner admin-form">
            <div className="row admin-head">
              <div>
                <strong className="impact-label">Admin — add a charity</strong>
                <p className="subtitle admin-blurb">
                  Build a full profile below. Add upcoming events with clear dates so supporters know how to join.
                </p>
              </div>
            </div>

            <div className="grid grid-2 admin-form__grid">
              <div className="field">
                <div className="label">Charity name</div>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. First Tee Scholars"
                />
              </div>
              <div className="field">
                <div className="label">Category</div>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.filter((c) => c.value !== "all").map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field admin-form__field">
              <div className="label">Cover image URL (optional)</div>
              <input
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://…"
              />
            </div>

            <div className="field">
              <div className="label">Impact story</div>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Who you help, how donations are used, and why it matters."
              />
            </div>

            <div className="admin-events">
              <div className="row events-toolbar">
                <strong>Upcoming events</strong>
                <button className="btn small" type="button" onClick={addEventRow}>
                  + Add event
                </button>
              </div>
              <p className="subtitle admin-events__hint">
                Each row is optional. If you enter a title, add a date so it appears on the calendar-style profile.
              </p>

              <div className="grid admin-events__list">
                {events.map((ev, idx) => (
                  <div key={idx} className="card soft event-editor-row">
                    <div className="grid grid-2">
                      <div className="field">
                        <div className="label">Event title</div>
                        <input
                          value={ev.title}
                          onChange={(e) => updateEvent(idx, { title: e.target.value })}
                          placeholder="e.g. Sunrise scramble for schools"
                        />
                      </div>
                      <div className="field">
                        <div className="label">Event date</div>
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => updateEvent(idx, { date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-2 event-grid-tight">
                      <div className="field">
                        <div className="label">Type</div>
                        <select
                          value={ev.type}
                          onChange={(e) => updateEvent(idx, { type: e.target.value })}
                        >
                          {EVENT_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <div className="label">Short details (optional)</div>
                        <input
                          value={ev.description}
                          onChange={(e) => updateEvent(idx, { description: e.target.value })}
                          placeholder="Venue, time, or how to register"
                        />
                      </div>
                    </div>
                    <div className="row row-actions">
                      <button
                        className="btn small danger"
                        type="button"
                        onClick={() => removeEventRow(idx)}
                        disabled={events.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row admin-submit">
              <button className="btn primary" type="button" onClick={createCharity}>
                Publish charity
              </button>
              <button className="btn" type="button" onClick={reload}>
                Refresh list
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-2 card-grid">
          {data.length === 0 ? (
            <div className="card">
              <div className="subtitle">No charities match your filters.</div>
            </div>
          ) : (
            data.map((c) => (
              <article key={c._id || c.name} className="card charity-card lift">
                <div className="row charity-card__head">
                  <strong>{c.name}</strong>
                  <span className="pill warm">{c.featured ? "Spotlight" : c.category || "Partner"}</span>
                </div>
                <p className="subtitle charity-card__desc">
                  {c.description || "Story coming soon — open the profile to learn more."}
                </p>
                {Array.isArray(c.events) && c.events.length > 0 ? (
                  <p className="subtitle faint charity-card__events-hint">
                    {c.events.filter((e) => e.title).length} upcoming moment
                    {c.events.filter((e) => e.title).length === 1 ? "" : "s"} listed — see profile for dates.
                  </p>
                ) : null}
                <div className="row charity-card__actions">
                  <Link className="btn small primary" to={`/charity/${c._id}`}>
                    View profile
                  </Link>
                  {me?.role === "admin" ? (
                    <>
                      <button
                        className="btn small"
                        type="button"
                        onClick={async () => {
                          try {
                            await charityApi.feature(c._id);
                            toast.success("Spotlight charity updated");
                            reload();
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Failed to feature");
                          }
                        }}
                      >
                        Set spotlight
                      </button>
                      <button
                        className="btn small danger"
                        type="button"
                        onClick={async () => {
                          try {
                            await charityApi.remove(c._id);
                            toast.success("Charity removed");
                            reload();
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Delete failed");
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
