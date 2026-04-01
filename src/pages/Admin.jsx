import { useState } from "react";
import { toast } from "react-toastify";
import { useAdminPanel } from "../hooks/useAdminPanel";
import "../styles/pages/admin.css";

function Table({ columns, rows, keyField }) {
  return (
    <div className="card table-wrap">
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[keyField]}>
                {columns.map((c) => (
                  <td key={c.key} className={c.nowrap ? "nowrap" : ""}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td className="empty" colSpan={columns.length}>
                  No data.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState("overview"); // overview | users | subscriptions | winners | operations
  const {
    summary,
    users,
    winners,
    subs,
    charities,
    loading,
    isAdmin,
    reload: load,
    runDraw,
    updateUserRole,
    approveWinner,
    updateSub,
    setFeaturedCharity,
  } = useAdminPanel();

  if (!isAdmin && !loading) {
    return (
      <div className="page page-admin">
        <div className="container">
          <div className="card">
            <h2 className="title">Admin Panel</h2>
            <p className="subtitle">
              Access denied. This area is only available for admin accounts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-admin">
      <div className="container">
        <div className="row header-row">
          <div>
            <h2 className="title">Admin Panel</h2>
            <p className="subtitle">Manage users, winners, draws, and platform health.</p>
          </div>
          <div className="row">
            <button className="btn small" type="button" onClick={load}>
              Refresh
            </button>
          </div>
        </div>

        <div className="row tab-row tab-row--scroll">
          <button
            className={`btn small ${tab === "overview" ? "primary" : ""}`}
            type="button"
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={`btn small ${tab === "users" ? "primary" : ""}`}
            type="button"
            onClick={() => setTab("users")}
          >
            Users
          </button>
          <button
            className={`btn small ${tab === "subscriptions" ? "primary" : ""}`}
            type="button"
            onClick={() => setTab("subscriptions")}
          >
            Subscriptions
          </button>
          <button
            className={`btn small ${tab === "winners" ? "primary" : ""}`}
            type="button"
            onClick={() => setTab("winners")}
          >
            Winners
          </button>
          <button
            className={`btn small ${tab === "operations" ? "primary" : ""}`}
            type="button"
            onClick={() => setTab("operations")}
          >
            Operations
          </button>
          <div className="spacer" />
          {loading ? <span className="subtitle">Loading…</span> : null}
        </div>

        {tab === "overview" ? (
          <div className="grid grid-2 overview-grid">
            <div className="card">
              <strong>Platform summary</strong>
              <div className="grid summary-grid">
                <div className="row summary-row">
                  <span className="subtitle">Users</span>
                  <strong>{summary?.users ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Active subscriptions</span>
                  <strong>{summary?.activeSubs ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Charities</span>
                  <strong>{summary?.charities ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Draws (all)</span>
                  <strong>{summary?.draws ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Published draws</span>
                  <strong>{summary?.drawsPublished ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Independent donations total</span>
                  <strong>₹{Math.round(summary?.independentDonationsTotal || 0)}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Winners pending verification</span>
                  <strong>{summary?.winnersPending ?? "—"}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Prize paid total</span>
                  <strong>₹{Math.round(summary?.totalPrizePaid || 0)}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">Outstanding payout</span>
                  <strong>₹{Math.round(summary?.totalPrizeOutstanding || 0)}</strong>
                </div>
                <div className="row summary-row">
                  <span className="subtitle">5-match jackpot rollover (next draw)</span>
                  <strong>₹{Math.round(summary?.jackpotRollover || 0)}</strong>
                </div>
              </div>
            </div>

            <div className="card">
              <strong>Quick actions</strong>
              <div className="subtitle quick-actions">Use these to generate data for the platform demo.</div>
              <div className="row quick-buttons">
                <button
                  className="btn primary"
                  type="button"
                  onClick={async () => {
                    try {
                      await runDraw();
                    } catch (err) {
                      toast.error(err?.response?.data?.msg || "Run draw failed");
                    }
                  }}
                >
                  Run draw now
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={async () => {
                    try {
                      await runDraw({ numbers: [20, 25, 30, 35, 40], simulate: true });
                    } catch (err) {
                      toast.error(err?.response?.data?.msg || "Test draw failed");
                    }
                  }}
                >
                  Run test draw
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setTab("winners")}
                >
                  Review winners
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "subscriptions" ? (
          <div className="table-section">
            <Table
              keyField="_id"
              columns={[
                {
                  key: "user",
                  header: "User",
                  render: (s) =>
                    s.user ? `${s.user.name || "—"} (${s.user.email || "—"})` : String(s.userId),
                },
                { key: "plan", header: "Plan", nowrap: true },
                { key: "status", header: "Status", nowrap: true },
                {
                  key: "expiryDate",
                  header: "Expiry",
                  nowrap: true,
                  render: (s) => (s.expiryDate ? new Date(s.expiryDate).toLocaleDateString() : "—"),
                },
                {
                  key: "actions",
                  header: "Actions",
                  nowrap: true,
                  render: (s) => (
                    <div className="row">
                      <button
                        className="btn small success"
                        type="button"
                        onClick={async () => {
                          try {
                            await updateSub(s._id, { status: "active" });
                            toast.success("Subscription activated");
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Update failed");
                          }
                        }}
                      >
                        Activate
                      </button>
                      <button
                        className="btn small danger"
                        type="button"
                        onClick={async () => {
                          try {
                            await updateSub(s._id, { status: "cancelled" });
                            toast.success("Subscription cancelled");
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Update failed");
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={subs}
            />
          </div>
        ) : null}

        {tab === "users" ? (
          <div className="table-section">
            <Table
              keyField="_id"
              columns={[
                { key: "name", header: "Name", render: (u) => u.name || "—" },
                { key: "email", header: "Email", nowrap: true },
                { key: "role", header: "Role", nowrap: true },
                {
                  key: "actions",
                  header: "Actions",
                  nowrap: true,
                  render: (u) => (
                    <div className="row">
                      <button
                        className="btn small"
                        type="button"
                        onClick={async () => {
                          try {
                            const nextRole = u.role === "admin" ? "user" : "admin";
                            await updateUserRole(u._id, nextRole);
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Update failed");
                          }
                        }}
                      >
                        Toggle admin
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={users}
            />
          </div>
        ) : null}

        {tab === "winners" ? (
          <div className="table-section">
            <Table
              keyField="_id"
              columns={[
                {
                  key: "user",
                  header: "User",
                  render: (w) =>
                    w.user ? `${w.user.name || "—"} (${w.user.email || "—"})` : String(w.userId),
                },
                { key: "match", header: "Match", nowrap: true },
                { key: "prize", header: "Prize", nowrap: true, render: (w) => `₹${w.prize}` },
                {
                  key: "status",
                  header: "Verification",
                  nowrap: true,
                  render: (w) => w.status,
                },
                {
                  key: "paymentStatus",
                  header: "Payment",
                  nowrap: true,
                  render: (w) => w.paymentStatus,
                },
                {
                  key: "proofImage",
                  header: "Proof",
                  render: (w) => (w.proofImage ? w.proofImage : "—"),
                },
                {
                  key: "actions",
                  header: "Actions",
                  nowrap: true,
                  render: (w) => (
                    <div className="row">
                      <button
                        className="btn small success"
                        type="button"
                        onClick={async () => {
                          try {
                            await approveWinner(w._id, { status: "approved" });
                            toast.success("Approved");
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Approve failed");
                          }
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn small danger"
                        type="button"
                        onClick={async () => {
                          try {
                            await approveWinner(w._id, { status: "rejected" });
                            toast.success("Rejected");
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Reject failed");
                          }
                        }}
                      >
                        Reject
                      </button>
                      <button
                        className="btn small"
                        type="button"
                        onClick={async () => {
                          try {
                            await approveWinner(w._id, { paymentStatus: "paid" });
                            toast.success("Marked paid");
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Update failed");
                          }
                        }}
                      >
                        Mark paid
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={winners}
            />
          </div>
        ) : null}

        {tab === "operations" ? (
          <div className="grid grid-2 operations-grid">
            <div className="card operations-card">
              <strong>Run monthly draw</strong>
              <p className="subtitle">
                This generates draw numbers and winners based on user scores.
              </p>
              <div className="row operations-actions">
                <button
                  className="btn primary"
                  type="button"
                  onClick={async () => {
                    try {
                      await runDraw();
                    } catch (err) {
                      toast.error(err?.response?.data?.msg || "Run draw failed");
                    }
                  }}
                >
                  Run draw now
                </button>
              </div>
            </div>

            <div className="card operations-card">
              <strong>Charity management</strong>
              <p className="subtitle">Pick featured/recipient charity for spotlight.</p>
              <div className="grid charity-ops">
                {charities.map((c) => (
                  <div key={c._id} className="row charity-row">
                    <span>
                      {c.name} {c.featured ? " (Featured)" : ""}
                    </span>
                    <div className="row">
                      <button
                        className="btn small"
                        type="button"
                        onClick={async () => {
                          try {
                            await setFeaturedCharity(c._id);
                          } catch (err) {
                            toast.error(err?.response?.data?.msg || "Failed");
                          }
                        }}
                      >
                        Set featured
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

