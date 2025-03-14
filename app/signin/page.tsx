"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignInPage = () => {
    const [providers, setProviders] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
            setIsReady(true); // Only show the page when everything is ready
        };
        fetchProviders();
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent NextAuth from handling the redirect
        });

        if (result?.error) {
            console.error("Sign-in error:", result.error);
            alert("Invalid email or password"); // Show error
        } else {
            window.location.href = "/"; // Manually handle redirection
        }
    };


    // Don't render anything until everything is ready
    if (!isReady) return null;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Sign in</h1>

                {/* Redirect to Sign Up */}
                <p className="text-center text-gray-600 text-sm mb-4">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-customPink hover:underline">
                        Sign up
                    </Link>
                </p>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    <button type="submit" className="bg-black text-white border border-black rounded-md p-3">
                        Sign in with Email
                    </button>
                </form>

                {/* Divider */}
                <div className="my-4 text-center text-gray-500">or</div>

                {/* Sign in with Google */}
                {providers && providers.google && (
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-800 text-black p-3 rounded-md hover:bg-gray-100"
                    >
                        <FcGoogle className="text-2xl" />
                        Sign in with Google
                    </button>
                )}
            </div>
        </div>
    );
};

export default SignInPage;
