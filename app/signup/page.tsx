"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        alert("Signup successful! Redirecting to sign in...");
        router.push("/signin");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

        {/* Redirect to Sign In */}
        <p className="text-center text-gray-600 text-sm mb-4">
          Already have an account?{" "}
          <a href="/signin" className="text-customPink hover:underline">
            Sign in
          </a>
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white border border-black rounded-md p-3"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up with Email"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">or</div>

        {/* Sign Up with Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/blogs" })}
          className="w-full flex bg-white border border-gray-800 text-black rounded-md p-3 items-center justify-center gap-3 hover:bg-gray-100"
        >
          <FcGoogle className="text-2xl" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
