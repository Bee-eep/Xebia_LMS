/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/contact/ContactForm.jsx
 *
 * Purpose:
 * Renders the Contact page of the application.
 *
 * Responsibilities:
 * - Display organization contact information.
 * - Provide a user-friendly contact form interface.
 * - Show the organization's physical location using
 *   an embedded Google Maps iframe.
 * - Maintain responsive behaviour across devices.
 *
 * Notes:
 * - This component is currently presentation-only.
 * - Form validation, state management, and API
 *   integration will be implemented in future releases.
 * ==========================================================
 */
import {
    IoPersonOutline,
    IoCallOutline,
    IoLocationOutline
} from "react-icons/io5";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoPencil } from "react-icons/go";

import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
/**
 * ContactForm Component
 *
 * @returns {JSX.Element}
 * A complete contact page consisting of:
 * - Hero section
 * - Company information panel
 * - Contact form
 * - Embedded office location map
 */

function InputField({
    type = "text",
    label,
    Icon,
    required = false,
}) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder=" "
                required={required}
                className="
                    peer
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white/80
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
                    bg-white/80
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
                {label}
            </label>

            {Icon && (
                <Icon
                    className="
                        absolute
                        right-4
                        top-4
                        text-xl
                        text-[var(--text-secondary)]
                    "
                />
            )}
        </div>
    );
}

function TextAreaField({
    label,
    required = false,
}) {
    return (
        <div className="relative">
            <textarea
                rows={6}
                placeholder=" "
                required={required}
                className="
                    peer
                    min-h-[180px]
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white/80
                    p-4
                    text-[var(--text-primary)]
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[var(--primary-color)]
                    focus:ring-4
                    focus:ring-[var(--primary-color)]/10
                    resize-none
                "
            />

            <label
                className="
                    pointer-events-none
                    absolute
                    left-4
                    top-4
                    bg-white/80
                    px-1
                    text-sm
                    text-[var(--text-secondary)]
                    transition-all

                    peer-placeholder-shown:top-4
                    peer-placeholder-shown:text-base

                    peer-focus:-top-2
                    peer-focus:text-xs
                    peer-focus:text-[var(--primary-color)]

                    peer-[&:not(:placeholder-shown)]:-top-2
                    peer-[&:not(:placeholder-shown)]:text-xs
                "
            >
                {label}
            </label>
        </div>
    );
}

export default function ContactForm() {
    const officeGallery = [
    {
        src: "/xebia-office-1.jpg",
        title: "Innovation Hub",
        description:
            "Modern collaborative spaces designed for learning and innovation.",
    },
    {
        src: "/xebia-office-2.jpg",
        title: "Creative Workspace",
        description:
            "An environment where ideas become impactful solutions.",
    },
    {
        src: "/xebia-office-3.jpg",
        title: "Learning Culture",
        description:
            "Continuous learning and collaboration are part of our DNA.",
    },
    {
        src: "/xebia-office-4.jpg",
        title: "Building Together",
        description:
            "Here at Xebia we strive for the best",
    },
    {
        src: "/xebia-office-5.jpg",
        title: "Sample Text",
        description:
            "lorem  text xyz",
    },
    {
        src: "/xebia-office-6.jpg",
        title: "Sample Text",
        description:
            "lorem  text xyz",
    },
];
const [currentImage, setCurrentImage] = useState(0);
const [progress, setProgress] = useState(0);
const [paused, setPaused] = useState(false);
const SLIDE_DURATION = 10000;
const INTERVAL = 50;
const PROGRESS_STEP = 100 / (SLIDE_DURATION / INTERVAL);
useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
                setCurrentImage((i) => (i + 1) % officeGallery.length);
                return 0;
            }

            return prev + PROGRESS_STEP;
        });
    }, INTERVAL);

    return () => clearInterval(interval);
}, [paused]);

const nextImage = () => {
    setCurrentImage((i) => (i + 1) % officeGallery.length);
    setProgress(0);
};

const previousImage = () => {
    setCurrentImage((i) =>
        i === 0 ? officeGallery.length - 1 : i - 1
    );
    setProgress(0);
};
    return (
        <>
            {/* HERO */}
            {/* Hero Banner */}
            <section
                className="
                    relative
                    flex
                    h-[40vh]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[url('/Login.png')]
                    bg-cover
                    bg-center
                    bg-fixed
                    before:absolute
                    before:inset-0
                    before:bg-black/65
                    after:absolute
                    after:bottom-[-1px]
                    after:left-0
                    after:h-[15px]
                    after:w-full
                    after:pointer-events-none
                    after:bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.15)_30%,var(--background)_100%)]
                "
            >
                <div className="relative z-10 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Contact Us
                    </h1>

                    <p className="text-lg text-white/85">
                        Let's build something great together.
                    </p>
                </div>
            </section>


            {/* CONTACT */}
            <section className="relative overflow-hidden bg-[var(--background)] px-[8%] py-24">
                {/* Background glow */}
                <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-[var(--primary-color)]/10 blur-3xl"></div>
                <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-[var(--primary-second-color)]/10 blur-3xl"></div>

                <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-20 lg:grid-cols-[0.9fr_1.1fr]">

                    {/* Company information section containing
                        office location, email, and phone details. */}
                    <div className="lg:sticky lg:top-28">

                        <span className="text-sm font-bold tracking-[2px] text-[var(--primary-color)]">
                            CONTACT
                        </span>

                        <h2 className="mt-4 text-4xl font-bold text-[var(--text-primary)] lg:text-5xl">
                            Get In Touch
                        </h2>

                        <p className="mt-6 mb-10 max-w-[520px] leading-8 text-[var(--text-secondary)]">
                            At Xebia, we help organizations transform
                            their businesses through cloud solutions,
                            automation, DevOps practices, and modern
                            software engineering.
                        </p>


                        <div 
                            className="
                                group
                                rounded-2xl
                                px-3
                                py-4
                                transition-all
                                duration-300
                                hover:translate-x-2
                                flex 
                                items-start 
                                gap-5
                                hover:bg-[var(--background-ui)]"
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--background-ui)]
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:bg-[var(--primary-color)]/5
                                "
                            >
                                <IoLocationOutline className="text-2xl text-[var(--primary-color)]" />
                            </div>

                            <div>
                                <h4
                                    className="
                                        mb-2
                                        text-lg
                                        font-semibold
                                        text-[var(--text-primary)]
                                        transition-colors
                                        duration-300
                                        group-hover:text-[var(--primary-color)]
                                    "
                                >
                                    Our Office
                                </h4>

                                <p className="leading-7 text-[var(--text-secondary)]">
                                    4th Floor, Capital Cyberscape,
                                    Sector-59, Golf Course Ext Rd,
                                    Gurugram, Haryana 122005
                                </p>
                            </div>

                        </div>


                        <div 
                            className="
                                group
                                rounded-2xl
                                px-3
                                py-4
                                transition-all
                                duration-300
                                hover:translate-x-2
                                flex 
                                items-start 
                                gap-5
                                hover:bg-[var(--background-ui)]"
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--background-ui)]
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:bg-[var(--primary-color)]/5
                                "
                            >
                                <MdOutlineAlternateEmail className="text-2xl text-[var(--primary-color)]" />
                            </div>

                            <div>
                                <h4
                                    className="
                                        mb-2
                                        text-lg
                                        font-semibold
                                        text-[var(--text-primary)]
                                        transition-colors
                                        duration-300
                                        group-hover:text-[var(--primary-color)]
                                    "
                                >
                                    Email Us
                                </h4>

                                <p className="leading-7 text-[var(--text-secondary)]">
                                    contact@xebia.com
                                </p>
                            </div>
                        </div>


                        <div 
                            className="
                                group
                                rounded-2xl
                                px-3
                                py-4
                                transition-all
                                duration-300
                                hover:translate-x-2
                                flex 
                                items-start 
                                gap-5
                                hover:bg-[var(--background-ui)]"
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[var(--background-ui)]
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:bg-[var(--primary-color)]/5
                                "
                            >
                                <IoCallOutline className="text-2xl text-[var(--primary-color)]" />
                            </div>

                            <div>
                                <h4
                                    className="
                                        mb-2
                                        text-lg
                                        font-semibold
                                        text-[var(--text-primary)]
                                        transition-colors
                                        duration-300
                                        group-hover:text-[var(--primary-color)]
                                    "
                                >
                                    Call Us
                                </h4>

                                <p className="leading-7 text-[var(--text-secondary)]">
                                    +91 124 664 7000
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* Contact form section.
                        Currently UI-only and not connected to a backend API. */}
                    <div
                        className="
                            rounded-[13px]
                            border
                            border-[var(--primary-color)]/30
                            bg-[var(--background)]
                            shadow-[20px_20px_40px_rgba(0,0,0,.05)]
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-[var(--primary-color)]/10
                            p-12
                            hover:shadow-[0_30px_80px_rgba(0,0,0,.12)]
                            lg:py-13
                        "
                    >

                    <h3 className="text-4xl font-bold text-[var(--text-primary)]">
                        Send us a message
                    </h3>

                    <p className="mt-2 mb-8 text-[var(--text-secondary)]">
                        We'll get back to you as soon as possible.
                    </p>
                        {/* Floating-label inputs rely on an empty
                            placeholder value (" ") so CSS can detect
                            whether the field contains user input. */}
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InputField
                                    label="First Name"
                                    Icon={IoPersonOutline}
                                    required
                                />

                                <InputField
                                    label="Last Name"
                                    Icon={IoPersonOutline}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InputField
                                    type="tel"
                                    label="Phone Number"
                                    Icon={IoCallOutline}
                                    required
                                />

                                <InputField
                                    type="email"
                                    label="Email"
                                    Icon={MdOutlineAlternateEmail}
                                    required
                                />
                            </div>

                            <InputField
                                label="Subject"
                                Icon={GoPencil}
                            />

                            <TextAreaField
                                label="Message"
                                required
                            />

                            <button
                                className="
                                    mt-4
                                    w-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-[var(--gradient1-xebia)]
                                    to-[var(--gradient2-xebia)]
                                    py-4
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* Photo Section */}
            <section className="bg-[var(--background)] px-[8%] py-28">

                <div className="mx-auto max-w-[1800px]">

                    <div className="mb-14 text-center">

                        <span className="text-sm font-bold tracking-[2px] text-[var(--primary-color)]">
                            INSIDE XEBIA
                        </span>

                        <h2 className="mt-4 text-4xl font-bold text-[var(--text-primary)] lg:text-5xl">
                            Where Learning Meets Innovation
                        </h2>

                        <p className="mx-auto mt-6 max-w-3xl leading-8 text-[var(--text-secondary)]">
                            Discover the spaces where collaboration, creativity,
                            and continuous learning come together to build
                            exceptional experiences.
                        </p>

                    </div>

                    <div
                        className="
                            group
                            relative
                            h-[80vh]
                            overflow-hidden
                            rounded-[18px]
                            shadow-[0_25px_80px_rgba(0,0,0,.12)]
                        "
                    >

                        {officeGallery.map((image, index) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={image.title}
                                className={`
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    transition-opacity
                                    duration-1000
                                    ${
                                        index === currentImage
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }
                                `}
                            />
                        ))}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 via-40% to-black/10" />
                        <div className="absolute inset-0 bg-black/10 backdrop-brightness-90" />

                        <div className="absolute bottom-10 left-10 max-w-xl text-white">

                            <h3 className="text-3xl font-bold">
                                {officeGallery[currentImage].title}
                            </h3>

                            <p className="mt-3 leading-7 text-white/85">
                                {officeGallery[currentImage].description}
                            </p>

                        </div>

                        <button
                            onClick={previousImage}
                            className="
                                absolute
                                left-6
                                top-[52%]
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-white/45
                                border
                                border-white/20
                                backdrop-blur-xl
                                backdrop-blur-xl
                                transition-all
                                hover:scale-110
                                hover:bg-white/55
                                hover:border-white/40
                            "
                        >
                            <FiChevronLeft size={22} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="
                                absolute
                                right-6
                                top-[52%]
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-white/45
                                border
                                border-white/20
                                backdrop-blur-xl
                                backdrop-blur-xl
                                transition-all
                                hover:scale-110
                                hover:bg-white/55
                                hover:border-white/40
                            "
                        >
                            <FiChevronRight size={22} />
                        </button>
                            
                        {/* Dots */}
                        <div
                            className="
                                absolute
                                bottom-8
                                left-1/2
                                z-30
                                flex
                                -translate-x-1/2
                                items-center
                                gap-2
                            "
                        >
                            {officeGallery.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentImage(index);
                                        setProgress(0);
                                    }}
                                    className={`
                                        h-2.5
                                        rounded-full
                                        transition-[width]
                                        duration-75
                                        ease-linear
                                        ${
                                            currentImage === index
                                                ? "w-8 bg-[#a65999]/75"
                                                : "w-2.5 bg-white/40 hover:bg-white/70"
                                        }
                                    `}
                                />
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">

                            <div
                                className="h-full rounded-full bg-[#a65999] transition-all duration-100"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                    </div>

                </div>

            </section>

        </>
    );
}