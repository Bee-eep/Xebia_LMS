/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/navbar/Navbar.jsx
 *
 * Purpose:
 * Renders the global navigation bar used across
 * public-facing and authentication pages.
 *
 * Responsibilities:
 * - Display company branding.
 * - Provide primary navigation links.
 * - Allow users to toggle between light and dark themes.
 * - Surface the primary call-to-action.
 * - Maintain a consistent user experience throughout
 *   the application.
 *
 * Dependencies:
 * - Next.js Link for client-side navigation.
 * - Next.js Image for optimized logo rendering.
 * - ThemeContext for theme state management.
 * - React Icons for theme toggle indicators.
 *
 * ==========================================================
 */
import { Link, NavLink } from "react-router-dom";

import {
    MdOutlineDarkMode,
    MdOutlineLightMode,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";

import { useTheme } from "@/context/ThemeContext.jsx";
/**
 * Navbar Component
 *
 * @returns {JSX.Element}
 * A fixed navigation bar containing:
 * - Company logo
 * - Primary navigation links
 * - Theme switcher
 * - Login/Get Started action
 */
export default function Navbar() {
    // Retrieve the current application theme
    // and the function responsible for toggling
    // between light and dark modes.
    const { theme, toggleTheme } = useTheme();
    const navItems = [
        {
            to: "/home",
            label: "Home",
            icon: AiOutlineHome,
        },
        {
            to: "/faq",
            label: "FAQ",
            icon: LuMessageCircleMore,
        },
        {
            to: "/contact",
            label: "Contact Us",
            icon: IoCallOutline,
        },
    ];

    return (
        <nav className="fixed inset-x-0 top-3.5 z-50 px-4">
            <div
                className="
                    mx-auto
                    flex
                    h-[64px]
                    max-w-7xl
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-[var(--background-ui)]/80
                    px-8
                    shadow-xl
                    backdrop-blur-xl
                "
            >

                {/* Logo */}

                <Link to="/home">
                    <img
                        src="/logo-light.png"
                        alt="Xebia Logo"
                        className="
                            h-10
                            w-auto
                            transition-transform
                            duration-300
                            hover:scale-105
                        "
                    />
                </Link>

                {/* Navigation */}

                <div className="hidden items-center gap-10 md:flex">

                    {navItems.map(({ to, label, icon: Icon }) => (

                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `
                                group
                                relative
                                flex
                                items-center
                                gap-2
                                font-medium
                                transition-all
                                duration-300
                                ${
                                    isActive
                                        ? "text-[var(--primary-color)]"
                                        : "text-[var(--text-primary)] hover:text-[var(--primary-color)]"
                                }
                            `
                            }
                        >

                            <Icon className="text-lg" />

                            <span>{label}</span>

                            <span
                                className="
                                    absolute
                                    -bottom-2
                                    left-0
                                    h-0.5
                                    w-0
                                    rounded-full
                                    bg-gradient-to-r
                                    from-[var(--gradient1-xebia)]
                                    to-[var(--gradient2-xebia)]
                                    transition-all
                                    duration-300
                                    group-hover:w-full
                                "
                            />

                        </NavLink>

                    ))}

                </div>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    <button
                        onClick={toggleTheme}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[var(--primary-tertiary-color)]
                            transition-all
                            duration-300
                            hover:rotate-12
                            hover:border-[var(--primary-color)]
                            hover:text-[var(--primary-color)]
                        "
                    >
                        {theme === "light"
                            ? <MdOutlineDarkMode />
                            : <MdOutlineLightMode />}
                    </button>

                    <Link
                        to="/login"
                        className="
                            rounded-full
                            bg-gradient-to-r
                            from-[var(--gradient1-xebia)]
                            to-[var(--gradient2-xebia)]
                            px-6
                            py-3
                            font-semibold
                            text-white
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                        "
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </nav>
    );
}