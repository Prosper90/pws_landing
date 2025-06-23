"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  // Loading states
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // const [authToken, setAuthToken] = useState<string | null>(
  //   typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  // );

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.data.token;
        // setAuthToken(token);
        localStorage.setItem("authToken", token);
        // loadDashboardData();
      } else {
        alert("Login failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Login failed: Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <a
            href="/"
            className="h-8 w-8 mr-2 flex items-center justify-center text-xs font-bold"
          >
            <img src="/logo.png" alt="" />
          </a>
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <p className="text-gray-500 text-center mb-8">
          Please enter your email address and password to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 text-start"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email address"
                className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-start"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter your password"
                className="w-full bg-transparent px-4 py-3 border border-[#5C97FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5C97FF] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
