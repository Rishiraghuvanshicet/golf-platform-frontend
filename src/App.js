import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/NavBar";
import RouteSeo from "./components/RouteSeo";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Draw from "./pages/Draw";
import Winner from "./pages/Winner";
import Charity from "./pages/Charity";
import CharityDetail from "./pages/CharityDetail";
import Donate from "./pages/Donate";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        draggable={false}
        newestOnTop
        closeOnClick
        theme="dark"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/draw"
          element={
            <ProtectedRoute>
              <Draw />
            </ProtectedRoute>
          }
        />
        <Route
          path="/winner"
          element={
            <ProtectedRoute>
              <Winner />
            </ProtectedRoute>
          }
        />
        <Route path="/charity" element={<Charity />} />
        <Route path="/charity/:id" element={<CharityDetail />} />
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { useEffect, useMemo, useState } from "react";
// import "./App.css";
// import { http } from "./api/http";

// function App() {
//   const [mode, setMode] = useState("login"); // login | register | dashboard
//   const [auth, setAuth] = useState(() => ({
//     token: localStorage.getItem("token") || "",
//     user: null,
//   }));

//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [charities, setCharities] = useState([]);
//   const [score, setScore] = useState("");
//   const [scoreDate, setScoreDate] = useState("");
//   const [subscriptionPlan, setSubscriptionPlan] = useState("monthly");
//   const isAuthed = useMemo(() => Boolean(auth.token), [auth.token]);

//   useEffect(() => {
//     http
//       .get("/charity")
//       .then((r) => setCharities(r.data))
//       .catch(() => setCharities([]));
//   }, []);

//   useEffect(() => {
//     if (isAuthed) setMode("dashboard");
//   }, [isAuthed]);

//   async function onLogin(e) {
//     e.preventDefault();
//     const r = await http.post("/auth/login", {
//       email: form.email,
//       password: form.password,
//     });
//     localStorage.setItem("token", r.data.token);
//     setAuth({ token: r.data.token, user: r.data.user || null });
//     setMode("dashboard");
//   }

//   async function onRegister(e) {
//     e.preventDefault();
//     await http.post("/auth/register", {
//       name: form.name,
//       email: form.email,
//       password: form.password,
//     });
//     setMode("login");
//   }

//   async function onCreateSubscription(e) {
//     e.preventDefault();
//     await http.post("/subscription", { plan: subscriptionPlan });
//     alert("Subscription created (mock).");
//   }

//   async function onAddScore(e) {
//     e.preventDefault();
//     const r = await http.post("/score", {
//       score: Number(score),
//       date: scoreDate || undefined,
//     });
//     alert(`Saved. You now have ${r.data.scores?.length || 0} score(s).`);
//     setScore("");
//     setScoreDate("");
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     setAuth({ token: "", user: null });
//     setMode("login");
//   }

//   return (
//     <div className="App">
//       <div style={{ maxWidth: 880, margin: "0 auto", padding: 24 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//           <div>
//             <h2 style={{ margin: 0 }}>Golf Charity Subscription Platform</h2>
//             <div style={{ opacity: 0.8, marginTop: 6 }}>
//               Charities listed: {charities.length}
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {isAuthed ? (
//               <button onClick={logout}>Logout</button>
//             ) : (
//               <>
//                 <button onClick={() => setMode("login")}>Login</button>
//                 <button onClick={() => setMode("register")}>Register</button>
//               </>
//             )}
//           </div>
//         </div>

//         {!isAuthed && mode === "login" && (
//           <form onSubmit={onLogin} style={{ marginTop: 24 }}>
//             <h3>Login</h3>
//             <div style={{ display: "grid", gap: 10 }}>
//               <input
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
//               />
//               <input
//                 placeholder="Password"
//                 type="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, password: e.target.value }))
//                 }
//               />
//               <button type="submit">Sign in</button>
//             </div>
//           </form>
//         )}

//         {!isAuthed && mode === "register" && (
//           <form onSubmit={onRegister} style={{ marginTop: 24 }}>
//             <h3>Create account</h3>
//             <div style={{ display: "grid", gap: 10 }}>
//               <input
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//               />
//               <input
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
//               />
//               <input
//                 placeholder="Password"
//                 type="password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, password: e.target.value }))
//                 }
//               />
//               <button type="submit">Register</button>
//             </div>
//           </form>
//         )}

//         {isAuthed && mode === "dashboard" && (
//           <div style={{ marginTop: 24, display: "grid", gap: 20 }}>
//             <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
//               <h3 style={{ marginTop: 0 }}>Subscription</h3>
//               <form onSubmit={onCreateSubscription} style={{ display: "flex", gap: 10 }}>
//                 <select
//                   value={subscriptionPlan}
//                   onChange={(e) => setSubscriptionPlan(e.target.value)}
//                 >
//                   <option value="monthly">Monthly</option>
//                   <option value="yearly">Yearly</option>
//                 </select>
//                 <button type="submit">Create subscription</button>
//               </form>
//               <div style={{ opacity: 0.75, marginTop: 8 }}>
//                 (Currently a backend “mock” subscription — Stripe not wired yet.)
//               </div>
//             </div>

//             <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
//               <h3 style={{ marginTop: 0 }}>Enter Stableford score</h3>
//               <form onSubmit={onAddScore} style={{ display: "grid", gap: 10 }}>
//                 <input
//                   placeholder="Score (1-45)"
//                   value={score}
//                   onChange={(e) => setScore(e.target.value)}
//                 />
//                 <input
//                   placeholder="Date (optional: YYYY-MM-DD)"
//                   value={scoreDate}
//                   onChange={(e) => setScoreDate(e.target.value)}
//                 />
//                 <button type="submit">Save score</button>
//               </form>
//               <div style={{ opacity: 0.75, marginTop: 8 }}>
//                 Backend enforces rolling last 5 scores.
//               </div>
//             </div>

//             <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
//               <h3 style={{ marginTop: 0 }}>Charity directory (read-only)</h3>
//               {charities.length === 0 ? (
//                 <div style={{ opacity: 0.75 }}>No charities found yet.</div>
//               ) : (
//                 <ul style={{ margin: 0, paddingLeft: 18 }}>
//                   {charities.map((c) => (
//                     <li key={c._id || c.name}>
//                       <strong>{c.name}</strong>
//                       {c.description ? ` — ${c.description}` : ""}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
