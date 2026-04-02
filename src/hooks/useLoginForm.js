import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export function useLoginForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    if (!data.email || !data.password) {
      toast.error("All fields required");
      return;
    }
    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("auth:changed"));
      toast.success("Login successful — welcome back!");
      if (res.data?.user?.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Login failed");
    }
  };

  return { data, setData, login };
}
