/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/home/Home.jsx
 *
 * Purpose:
 * Renders the public landing page of the application.
 *
 * Responsibilities:
 * - Introduce the Xebia LMS platform.
 * - Highlight key platform features.
 * - Showcase enterprise success metrics.
 * - Present customer testimonials.
 * - Encourage user onboarding through
 *   clear calls-to-action.
 *
 * Dependencies:
 * - Next.js Image component for optimized assets.
 * - React Icons for feature illustrations.
 * - CSS Modules for component-scoped styling.
 *
 * ==========================================================
 */

import { Link } from "react-router-dom";
import { useState } from "react";

import JourneyTimeline from "./journey/JourneyTimeline";

import {
    FiBookOpen,
    FiShield,
    FiLayers,
    FiAward,
    FiBarChart2,
    FiUsers,
} from "react-icons/fi";

import { IoIosCheckmarkCircle } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { IoBook } from "react-icons/io5";
import { HiMiniTrophy } from "react-icons/hi2";


/*Count Up animation*/
import CountUpModule from "react-countup";
const CountUp = CountUpModule.default;


/* 
6 cards in Feature Section.
*/
const features = [
    {
        icon: FiBookOpen,
        category: "COURSES",
        title: "Course Creation",
        description:
            "Build engaging courses with videos, documents, quizzes, assignments, and multimedia content.",
    },
    {
        icon: FiLayers,
        category: "LEARNING",
        title: "Learning Paths",
        description:
            "Create personalized learning journeys for students, employees, and trainees based on roles or programs.",
    },
    {
        icon: FiAward,
        category: "CERTIFICATION",
        title: "Certificates",
        description:
            "Award secure digital certificates after successful completion of courses, assessments, or learning paths.",
    },
    {
        icon: FiShield,
        category: "ASSESSMENTS",
        title: "Assessments & Quizzes",
        description:
            "Evaluate learners using quizzes, assignments, coding challenges, and automated grading tools.",
    },
    {
        icon: FiBarChart2,
        category: "ANALYTICS",
        title: "Learning Analytics",
        description:
            "Monitor learner progress, engagement, completion rates, and performance through detailed dashboards.",
    },
    {
        icon: FiUsers,
        category: "MANAGEMENT",
        title: "Organization Management",
        description:
            "Manage learners, instructors, departments, permissions, and administrative roles from one platform.",
    },
];

/**
 * Home Component
 *
 * @returns {JSX.Element}
 * A complete landing page consisting of:
 * - Hero section
 * - Platform statistics
 * - Feature highlights
 * - Customer testimonial
 * - Final call-to-action
 */

const stats = [
    {
        icon: IoIosCheckmarkCircle,
        value: 98,
        duration: 3.5,
        suffix: "%",
        label: "Completion Rate",
    },
    {
        icon: IoBook,
        value: 50,
        duration: 2.5,
        suffix: "+",
        label: "Expert Courses",
    },
    {
        icon: PiStudentFill,
        value: 15,
        duration: 2.5,
        suffix: "K+",
        label: "Active Learners",
    },
    {
        icon: HiMiniTrophy,
        value: 5,
        duration: 2.5,
        suffix: "K",
        label: "Certified Learners",
    },
];

export default function Home() {
    const handleMouseMove = (e) => {

        const rect = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX =
            ((y - rect.height / 2) / rect.height) * - 2.5;
        const rotateY =
            ((x - rect.width / 2) / rect.width) * 2.5;

        setMouse({
            x,
            y,
            rotateX,
            rotateY,
        });
    };

    const handleMouseLeave = () => {

        setMouse({
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
        });

    };

    const [mouse, setMouse] = useState({
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
    });

    return (
        <>

            {/* Hero banner introducing the platform
                and directing users toward primary actions. */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden">

                <video
                    className="fixed inset-0 z-0 h-screen w-screen object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="/homepagevid.mp4"
                        type="video/mp4"
                    />
                </video>

                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background:
                            "linear-gradient(var(--background-gradient2), var(--background-gradient1))",
                    }}
                />

                <div className="relative z-[2] text-center">

                    <span className="text-base font-extrabold tracking-[2.5px] text-[var(--primary-second-color)]">
                        ENTERPRISE LEARNING PLATFORM
                    </span>

                    <h1 className="mt-[18px] text-5xl leading-none text-[var(--text-primary)] md:text-7xl animate-fade-in-up">

                        Innovation & Learning

                        <br />

                        Without{" "}

                        <span className="text-[var(--primary-second-color)]">
                            Boundaries
                        </span>

                    </h1>

                    <p className="mx-auto mt-8 max-w-[700px] leading-7 text-[var(--text-primary)]">

                        Empower your workforce with a modern,
                        scalable, and intelligent learning
                        ecosystem designed for enterprise growth.

                    </p>

                    <div className="mt-10 flex justify-center gap-10">

                        <Link
                            to="/login"
                            className="
                                rounded-full
                                bg-[var(--primary-color)]
                                px-10
                                py-4
                                text-[1.05rem]
                                font-bold
                                text-[white]
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                active:translate-y-0
                                active:scale-95
                            "
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/contact"
                            className="
                                rounded-full
                                border
                                border-[var(--primary-color)]/40
                                bg-[var(--primary-color)]/15
                                px-10
                                py-4
                                text-[1.05rem]
                                font-bold
                                text-white
                                backdrop-blur-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-white/15
                                hover:border-white/60
                                hover:shadow-[0_12px_30px_rgba(255,255,255,0.08)]
                                active:translate-y-0
                                active:scale-95
                            "
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>


            {/* High-level platform metrics used to
                establish trust and social proof. */}

            <section className="relative z-[1] grid grid-cols-1 gap-10 bg-[var(--background)] px-[8%] py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-24">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="flex items-center justify-center gap-5"
                        >
                            <Icon className="shrink-0 text-[3.5rem] text-[var(--primary-second-color)]" />

                            <div className="text-left">
                                <h2 className="text-5xl font-normal text-[var(--primary-second-color)] transition-all duration-300">
                                    <CountUp
                                        end={stat.value}
                                        duration={stat.duration}
                                        suffix={stat.suffix}
                                    />
                                </h2>

                                <p className="text-[var(--text-secondary)]">
                                    {stat.label}
                                </p>

                            </div>

                        </div>
                    );
                })}
            </section>


            {/* Core platform capabilities and
                enterprise learning advantages. */}

            <section className="relative z-[1] bg-[var(--background-ui)] px-[8%] py-[120px]">
                <div>
                    <span className="font-bold tracking-[2px] text-[var(--primary-color)]">
                        WHY XEBIA LMS
                    </span>

                    <h2 className="mt-5 text-[3.5rem] leading-[1.25] text-[var(--text-primary)]">
                        Everything You Need
                        <br />
                        To Deliver Exceptional Learning
                    </h2>

                    <p className="mt-[25px] max-w-[600px] leading-[1.6] text-[var(--text-secondary)]">
                        Whether you're educating students, onboarding employees, or delivering professional training, Xebia LMS provides everything needed to create, manage, and measure impactful learning experiences.
                    </p>

                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="
                                    group
                                    rounded-3xl
                                    border
                                    border-transparent
                                    bg-[var(--background)]
                                    p-8
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:border-[rgba(108,29,95,0.15)]
                                    hover:bg-[var(--background-gradient1)]
                                    hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)]
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[var(--primary-color)]
                                        text-3xl
                                        text-white
                                        transition-transform
                                        duration-300
                                        group-hover:scale-110
                                    "
                                >
                                    <Icon />
                                </div>

                                <span
                                    className="
                                        mt-7
                                        block
                                        text-xs
                                        font-bold
                                        tracking-[2px]
                                        text-[var(--primary-color)]
                                    "
                                >
                                    {feature.category}
                                </span>

                                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-8 text-[var(--text-secondary)]">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>


            {/* Customer success story highlighting
                measurable business impact. */}

            <section className="relative z-[1] bg-[var(--background)] px-[8%] pt-32 pb-20">

                <div className="mx-auto max-w-4xl text-center">

                    <span
                        className="
                            inline-block
                            rounded-full
                            bg-[var(--background-ui)]
                            px-5
                            py-2
                            text-xs
                            font-bold
                            tracking-[3px]
                            text-[var(--primary-color)]
                        "
                    >
                        HOW IT WORKS
                    </span>

                    <h2
                        className="
                            mt-8
                            text-5xl
                            font-bold
                            leading-tight
                            text-[var(--text-primary)]
                            md:text-6xl
                        "
                    >
                        Experience the Complete
                        <br />
                        Learning Journey
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-8
                            max-w-3xl
                            text-xl
                            leading-9
                            text-[var(--text-secondary)]
                        "
                    >
                        From your first login to earning
                        industry-recognized certifications,
                        every step is seamlessly connected
                        inside one modern learning platform.
                    </p>

                    <div
                        className="
                            mx-auto
                            mt-14
                            h-px
                            w-40
                            bg-gradient-to-r
                            from-transparent
                            via-[var(--primary-color)]
                            to-transparent
                        "
                    />

                    <p
                        className="
                            mt-6
                            text-sm
                            tracking-[2px]
                            text-[var(--text-secondary)]
                        "
                    >
                        Scroll to explore the journey
                    </p>

                </div>

            </section>

            {/* Journey Graph */}
            <JourneyTimeline />


            {/* Final conversion section encouraging
                users to begin their learning journey. */}

            <section className="relative z-[1] bg-[var(--background-ui)] px-[6%] py-10   [perspective:1200px]">

                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `
                            rotateX(${mouse.rotateX}deg)
                            rotateY(${mouse.rotateY}deg)
                        `,
                    }}
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        shadow-2xl
                        transition-[box-shadow,border-color]
                        duration-150
                        hover:shadow-[0_30px_80px_rgba(108,29,95,0.35)]
                        border
                        border-white/10
                        hover:border-white/20
                    "
                >

                    {/* Background Image */}
                    <img
                        src="/homecta.jpg"
                        alt="Enterprise Learning"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-120
                        "
                    />

                    {/* Purple Glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            h-[100px]
                            w-[100px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            blur-[200px]
                            transition-opacity
                            duration-300
                            opacity-0
                            group-hover:opacity-100
                        "
                        style={{
                            left: mouse.x,
                            top: mouse.y,
                            background:
                                "radial-gradient(circle, rgba(255, 120, 219, 1) 80%, rgba(108,29,95,.45) 60%, transparent 85%)",
                        }}
                    />

                    {/* White Glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            h-[100px]
                            w-[100px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            blur-[200px]
                            transition-opacity
                            duration-300
                            opacity-0
                            group-hover:opacity-100
                        "
                        style={{
                            left: mouse.x,
                            top: mouse.y,
                            background:
                                "radial-gradient(circle, rgba(255,255,255,.28), transparent 50%)",
                        }}
                    />
 
                    {/* Dark Overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-black/55
                            via-black/60
                            to-black/50
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            pointer-events-none
                            z-[5]
                            opacity-60
                        "
                        style={{
                            background: `radial-gradient(
                                circle 220px at ${mouse.x}px ${mouse.y}px,
                                rgba(255,255,255,.12),
                                transparent 70%
                            )`,
                        }}
                    />

                    {/* Content */}
                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            max-w-3xl
                            px-10
                            py-16
                            text-center
                        "
                    >

                        <span className="font-semibold tracking-[2px] text-white/80 uppercase">
                            Ready To Transform Your Learning Culture?
                        </span>

                        <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">

                            Join over
                            <span className="mx-2 bg-gradient-to-r from-[#ffe9f8] to-[#8f3780] bg-clip-text text-transparent">
                                {" "}1.2 million{" "}
                            </span>

                            professionals building
                            <br />
                            <span className="block mt-2"> the future of Learning.</span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">

                            Empower your workforce with a modern learning platform
                            trusted by enterprises to develop talent, accelerate
                            growth, and drive measurable business outcomes.

                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-5">

                            <Link
                                to="/login"
                                className="
                                    rounded-full
                                    bg-[var(--primary-color)]
                                    px-10
                                    py-4
                                    text-[1.05rem]
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_12px_30px_rgba(108,29,95,0.4)]
                                "
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/contact"
                                className="
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-white/10
                                    px-10
                                    py-4
                                    text-[1.05rem]
                                    font-bold
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:bg-white
                                    hover:text-[var(--primary-color)]
                                "
                            >
                                Contact Us
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </>
    );
}