import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLE_BASE = "Golf for Good — Play with purpose";

const routes = {
  "/": { title: `${TITLE_BASE} | Home`, description: "Subscribe, track Stableford scores, support charities, and join monthly prize draws." },
  "/login": { title: `Sign in | ${TITLE_BASE}`, description: "Sign in to manage your subscription, scores, and winnings." },
  "/register": { title: `Create account | ${TITLE_BASE}`, description: "Create an account to subscribe, pick a charity, and enter scores." },
  "/dashboard": { title: `Dashboard | ${TITLE_BASE}`, description: "Your subscription, profile, charity choice, and last five scores." },
  "/subscription": { title: `Subscription | ${TITLE_BASE}`, description: "Monthly or yearly subscription plans." },
  "/draw": { title: `Draw results | ${TITLE_BASE}`, description: "Monthly draw numbers and prize pool breakdown." },
  "/winner": { title: `Winnings | ${TITLE_BASE}`, description: "Your prizes, verification, and payout status." },
  "/charity": { title: `Charities | ${TITLE_BASE}`, description: "Explore charities and featured spotlight." },
  "/donate": { title: `Donate | ${TITLE_BASE}`, description: "Make an independent one-off donation to a charity — not tied to draws or gameplay." },
  "/admin": { title: `Admin | ${TITLE_BASE}`, description: "Platform administration, users, draws, and winners." },
};

function metaForPath(pathname) {
  if (routes[pathname]) return routes[pathname];
  if (/^\/charity\/[^/]+$/.test(pathname)) {
    return {
      title: `Charity profile | ${TITLE_BASE}`,
      description: "Charity details, images, and upcoming events such as golf days.",
    };
  }
  return { title: TITLE_BASE, description: routes["/"].description };
}

export default function RouteSeo() {
  const { pathname } = useLocation();
  const meta = metaForPath(pathname);

  useEffect(() => {
    document.title = meta.title;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.setAttribute("content", meta.description);
  }, [pathname, meta.title, meta.description]);

  return null;
}
