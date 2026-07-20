/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/login/LoginForm.jsx
 *
 * Purpose:
 * Renders the user authentication interface for
 * accessing the Xebia Learning Platform.
 *
 * Responsibilities:
 * - Display the login form UI.
 * - Collect user credentials.
 * - Provide secondary authentication actions.
 * - Redirect users to support channels when needed.
 * - Maintain responsive behaviour across devices.
 *
 * Dependencies:
 * - Next.js Image component for optimized assets.
 * - Next.js Link component for internal navigation.
 * - React Icons for form field indicators.
 * - CSS Modules for component-scoped styling.
 *
 * Notes:
 * - This component currently focuses on presentation.
 * - Authentication logic, validation, and API
 *   integration will be implemented in future phases.
 * ==========================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { useAuth } from "@/context/AuthContext.jsx";

/**
 * LoginForm Component
 *
 * @returns {JSX.Element}
 * A login interface containing:
 * - Company branding
 * - Email and password inputs
 * - Remember Me functionality
 * - Password recovery placeholder
 * - Administrator contact support
 */
export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const EyeIcon = showPassword ? LuEye : LuEyeOff;

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const res = login(email, password);
        if (res.success) {
            navigate("/dashboard");
        } else {
            setError(res.error);
        }
    };
    
    return (
        <section
            className="
                flex
                min-h-screen
                items-center
                justify-end
                overflow-hidden
                bg-[url('/Login.png')]
                bg-cover
                bg-center
                px-[10.5%]
                pt-20.5
                justify-end
            "
        >

        {/* Authentication card */}
            <div
                className="
                    w-[min(445px,90vw)]
                    rounded-[13px]
                    border
                    border-[var(--primary-color)]
                    bg-[var(--background)]
                    px-10
                    py-7
                    shadow-2xl
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_20px_50px_rgba(0,0,0,.15)]
                "
            >

            <div className="w-full">

                {/* Floating labels depend on an empty
                    placeholder value (" ") so CSS can
                    determine whether an input contains text. */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <img
                            src="/logo-light.png"
                            alt="Xebia Logo"
                            className="mx-auto mb-3.5 h-auto w-50 object-contain"
                        />

                        <h2 className="text-center text-[2.2rem]  font-bold tracking-tight text-[var(--text-primary)]">
                            Welcome Back!
                        </h2>

                        <p className="mt-0 mb-8 text-base text-center leading-relaxed text-[var(--text-secondary)]">
                            Sign in to your account
                        </p>

                        {error && (
                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    py-3
                                    text-center
                                    text-sm
                                    font-medium
                                    text-red-600
                                "
                            >
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                                className="
                                    peer
                                    h-13
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-[var(--background-ui)]
                                    px-4
                                    pr-12
                                    text-[var(--text-primary)]
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-[var(--primary-color)]
                                    focus:ring-4
                                    focus:ring-[var(--primary-color)]/10
                                "
                            />

                            <label
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-4
                                    px-1
                                    text-sm
                                    text-[var(--text-secondary)]
                                    transition-all
                                    duration-300

                                    peer-placeholder-shown:top-4
                                    peer-placeholder-shown:text-base

                                    peer-focus:-top-2
                                    peer-focus:text-xs
                                    peer-focus:text-[var(--primary-color)]

                                    peer-[&:not(:placeholder-shown)]:-top-2
                                    peer-[&:not(:placeholder-shown)]:text-xs
                                "
                            >
                                Email
                            </label>

                            <MdAlternateEmail
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    text-xl
                                    text-[var(--text-secondary)]
                                "
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                                className="
                                    peer
                                    h-13
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-[var(--background-ui)]
                                    px-4
                                    pr-12
                                    text-[var(--text-primary)]
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-[var(--primary-color)]
                                    focus:ring-4
                                    focus:ring-[var(--primary-color)]/10
                                "
                            />

                            <label
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-4
                                    px-1
                                    text-sm
                                    text-[var(--text-secondary)]
                                    transition-all
                                    duration-300

                                    peer-placeholder-shown:top-4
                                    peer-placeholder-shown:text-base

                                    peer-focus:-top-2
                                    peer-focus:text-xs
                                    peer-focus:text-[var(--primary-color)]

                                    peer-[&:not(:placeholder-shown)]:-top-2
                                    peer-[&:not(:placeholder-shown)]:text-xs
                                "
                            >
                                Password
                            </label>

                            <EyeIcon
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    cursor-pointer
                                    text-xl
                                    text-[var(--text-secondary)]
                                    transition-colors
                                    duration-300
                                    hover:text-[var(--primary-color)]
                                "
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            />
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                text-sm
                                text-[var(--text-primary)]
                            "
                        >
                            <label className="flex cursor-pointer items-center gap-2">
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <a
                                href="#"
                                className="
                                    transition-colors
                                    duration-300
                                    hover:text-[var(--primary-color)]
                                "
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="
                                w-full
                                rounded-full
                                bg-gradient-to-r
                                from-[var(--gradient1-xebia)]
                                to-[var(--gradient2-xebia)]
                                py-3.5
                                font-semibold
                                text-white
                                shadow-lg
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                            "
                        >
                            Login
                        </button>

                        <p className="pt-2 text-center text-sm text-[var(--text-primary)]">
                            Trouble Signing In?{" "}
                            <Link
                                to="/contact"
                                className="
                                font-semibold
                                text-[var(--primary-color)]
                                transition-colors
                                duration-300
                                hover:text-[var(--primary-second-color)]
                            "
                            >
                                Contact Administrator
                            </Link>
                        </p>

                        <div
                            className="
                                mt-8
                                border-t
                                border-gray-200
                                pt-6
                                text-center
                                text-sm
                                text-[var(--text-secondary)]
                            "
                        >
                            © 2026 Xebia Learning Platform.
                            All rights reserved.
                        </div>

                    </form>

                </div>

            </div>

        </section>
    );
}