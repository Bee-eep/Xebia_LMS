/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/footer/Footer.jsx
 *
 * Purpose:
 * Renders the global footer displayed across all
 * public-facing pages of the application.
 *
 * Responsibilities:
 * - Display company branding and mission statement.
 * - Provide quick navigation links.
 * - Surface helpful resources.
 * - Show organization contact information.
 * - Maintain responsive behaviour across devices.
 *
 * Notes:
 * - Internal navigation uses Next.js Link components.
 * - External resources are currently placeholders and
 *   will be connected in future iterations.
 * ==========================================================
 */

import { Link } from "react-router-dom";

import {
    FaLinkedinIn,
    FaFacebookF,
    FaTwitter,
} from "react-icons/fa";

import {
    IoLocationOutline,
    IoCallOutline,
} from "react-icons/io5";

import { MdOutlineAlternateEmail } from "react-icons/md";

/**
 * Footer Component
 *
 * @returns {JSX.Element}
 * A reusable application footer containing:
 * - Brand identity
 * - Navigation links
 * - Resource shortcuts
 * - Contact information
 * - Copyright notice
 */

export default function Footer() {

    const linkStyle =
        "block text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--primary-color)]";

    const socialStyle =
        "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--gradient1-xebia)] to-[var(--gradient2-xebia)] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

    return (

        <footer className="border-t z-[10] border-black/10 bg-[var(--background-ui)]">

            <div
                className="
                    mx-auto
                    grid
                    max-w-[1400px]
                    grid-cols-1
                    gap-15
                    px-[5%]
                    py-15
                    text-center
                    md:grid-cols-2
                    md:text-left
                    lg:grid-cols-4
                "
            >

                {/* Brand */}

                <div>

                    <img
                        src="/logo-light.png"
                        alt="Xebia"
                        className="mx-auto mb-8 h-14 w-auto md:mx-0"
                    />

                    <p className="mb-8 max-w-xs leading-8 text-[var(--text-secondary)] md:max-w-sm">
                        Empowering organizations through cloud,
                        DevOps, AI, and modern software engineering.
                    </p>

                    <address className="space-y-4 not-italic">

                        <div className="flex items-center justify-center gap-3 text-[var(--text-secondary)] md:justify-start">
                            <MdOutlineAlternateEmail />
                            <span>contact@xebia.com</span>
                        </div>

                        <div className="flex items-center justify-center gap-3 text-[var(--text-secondary)] md:justify-start">
                            <IoCallOutline />
                            <span>+91 124 664 7000</span>
                        </div>

                        <div className="flex items-center justify-center gap-3 text-[var(--text-secondary)] md:justify-start">
                            <IoLocationOutline />
                            <span>Gurugram, Haryana</span>
                        </div>

                    </address>

                </div>

                {/* Company */}

                <div>

                    <h3 className="mb-8 text-xl font-bold text-[var(--text-primary)]">
                        Company
                    </h3>

                    <div className="space-y-4">

                        <Link
                            to="/home"
                            className={linkStyle}
                        >
                            Home
                        </Link>

                        <Link
                            to="/faq"
                            className={linkStyle}
                        >
                            FAQ
                        </Link>

                        <Link
                            to="/contact"
                            className={linkStyle}
                        >
                            Contact
                        </Link>

                    </div>

                </div>

                {/* Resources */}

                <div>

                    <h3 className="mb-8 text-xl font-bold text-[var(--text-primary)]">
                        Resources
                    </h3>

                    <div className="space-y-4">

                        <a
                            href="#"
                            className={linkStyle}
                        >
                            Courses
                        </a>

                        <a
                            href="#"
                            className={linkStyle}
                        >
                            Blog
                        </a>

                        <a
                            href="#"
                            className={linkStyle}
                        >
                            Case Studies
                        </a>

                    </div>

                </div>

                {/* Social */}

                <div>

                    <h3 className="mb-8 text-xl font-bold text-[var(--text-primary)]">
                        Connect
                    </h3>

                    <div className="flex justify-center gap-4 md:justify-start">

                        <a
                            href="#"
                            className={socialStyle}
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>

                        <a
                            href="#"
                            className={socialStyle}
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>

                        <a
                            href="#"
                            className={socialStyle}
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                    </div>

                </div>

            </div>

            {/* Copyright */}

            <div
                className="
                    border-t
                    border-black/10
                    py-8
                    text-center
                    text-sm
                    text-[var(--text-secondary)]
                "
            >
                © 2026 Xebia Learning Platform. All rights reserved.
            </div>

        </footer>

    );
}