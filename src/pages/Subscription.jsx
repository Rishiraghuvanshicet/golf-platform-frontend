import { useSubscriptionPage } from "../hooks/useSubscriptionPage";
import "../styles/pages/subscription.css";

export default function Subscription() {
  const { sub, loading, subscribe, cancel } = useSubscriptionPage();

  return (
    <div className="page page-subscription">
      <div className="container">
        <h2 className="title">Subscription</h2>
        <p className="subtitle">Pick a plan. Stay eligible. Fund impact.</p>

        <div className="grid grid-2 grid-plans">
          <div className="card">
            <strong>Current status</strong>
            <div className="subtitle status-detail">
              {loading ? "Loading..." : sub?.status ? sub.status : "Not subscribed"}
              {sub?.expiryDate ? ` · renews ${new Date(sub.expiryDate).toLocaleDateString()}` : ""}
              {sub?.plan ? ` · ${sub.plan}` : ""}
            </div>
            {sub?.status === "active" ? (
              <div className="row cancel-row">
                <button className="btn danger" type="button" onClick={cancel}>
                  Cancel subscription
                </button>
                <span className="subtitle">You can re-activate anytime.</span>
              </div>
            ) : null}
          </div>

          <div className="card">
            <strong>Choose a plan</strong>
            <div className="subtitle plan-hint">
              (Stripe is not wired yet — these endpoints simulate subscription states.)
            </div>
            <div className="row plan-actions">
              <button className="btn success" type="button" onClick={() => subscribe("monthly")}>
                Monthly
              </button>
              <button className="btn primary" type="button" onClick={() => subscribe("yearly")}>
                Yearly (discount)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
