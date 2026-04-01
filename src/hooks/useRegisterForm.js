import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export function useRegisterForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    charityId: "",
    charityPercentage: 10,
  });

  const register = async () => {
    if (!data.name || !data.email || !data.password) {
      toast.error("All fields required");
      return;
    }
    if (!data.charityId) {
      toast.error("Select a charity (required at signup)");
      return;
    }
    try {
      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        charityId: data.charityId,
        charityPercentage: Number(data.charityPercentage) || 10,
      });
      toast.success("Registered successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error");
    }
  };

  return { data, setData, register };
}
