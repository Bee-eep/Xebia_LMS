import { useEffect, useRef, useState } from "react";

import JourneyStep from "./JourneyStep";
import journeySteps from "./journeyData";

export default function JourneyTimeline() {

    const containerRef = useRef(null);

    const [activeStep, setActiveStep] = useState(0);

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        let ticking = false;

        function updateTimeline() {

            if (!containerRef.current) return;

            const sections =
                containerRef.current.querySelectorAll("[data-step]");

            const trigger =
                window.innerHeight * 0.55;

            let current = 0;

            sections.forEach((section, index) => {

                const rect =
                    section.getBoundingClientRect();

                const center =
                    rect.top +
                    rect.height / 2;

                if (center <= trigger)
                    current = index;

            });

            setActiveStep(current);

            const rect =
                containerRef.current.getBoundingClientRect();

            const total =
                rect.height - window.innerHeight;

            const travelled =
                -rect.top;

            const p =
                Math.min(
                    Math.max(travelled / total, 0),
                    1
                );

            setProgress(p);

        }

        updateTimeline();

        function handleScroll() {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                updateTimeline();

                ticking = false;

            });

        }

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            handleScroll
        );

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

            window.removeEventListener(
                "resize",
                handleScroll
            );

        };

    }, []);

    return (

        <section
            ref={containerRef}
            className="
                relative
                bg-[var(--background)]
                px-[8%]
                pb-32
            "
        >

            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    grid-cols-12
                    gap-10
                "
            >

                {/* LEFT COLUMN */}

                <div
                    className="
                        col-span-12
                        lg:col-span-5
                    "
                >

                    {journeySteps.map((step, index) => {

                        const distance =
                            Math.abs(
                                activeStep - index
                            );

                        const stepProgress =
                            Math.max(
                                0,
                                1 - distance
                            );

                        return (

                            <div
                                key={step.id ?? index}
                                data-step
                            >

                                <JourneyStep
                                    step={step}
                                    index={index}
                                    progress={stepProgress}
                                />

                            </div>

                        );

                    })}

                </div>

                {/* CENTER TIMELINE */}

                <div
                    className="
                        hidden
                        lg:flex
                        col-span-1
                        justify-center
                    "
                >

                    <div
                        className="
                            sticky
                            top-0
                            flex
                            h-screen
                            items-center
                        "
                    >

                        <div
                            className="
                                relative
                                h-[60vh]
                                w-[4px]
                                rounded-full
                                bg-black/10
                                overflow-hidden
                            "
                        >

                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    w-full
                                    rounded-full
                                    bg-gradient-to-t
                                    from-[var(--gradient1-xebia)]
                                    to-[var(--gradient2-xebia)]
                                    origin-bottom
                                "
                                style={{
                                    height: `${progress * 100}%`
                                }}
                            />

                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    bg-[var(--primary-color)]
                                    ring-8
                                    ring-[rgba(108,29,95,.15)]
                                    shadow-[0_0_30px_rgba(108,29,95,.35)]
                                "
                            />

                        </div>

                    </div>

                </div>

                                {/* RIGHT COLUMN */}

                <div
                    className="
                        hidden
                        lg:block
                        lg:col-span-6
                    "
                >
                    <div
                        className="
                            sticky
                            top-0
                            flex
                            h-screen
                            items-center
                            justify-center
                        "
                    >
                        <div
                            className="
                                relative
                                aspect-video
                                w-full
                                overflow-hidden
                                rounded-3xl
                                border
                                border-black/10
                                bg-[var(--background)]
                                shadow-[0_35px_90px_rgba(0,0,0,.18)]
                            "
                        >
                            {journeySteps.map((step, index) => (

                                <img
                                    key={step.id ?? index}
                                    src={step.image}
                                    alt={step.alt}
                                    className={`
                                        absolute
                                        inset-0
                                        h-full
                                        w-full
                                        object-cover
                                        transition-all
                                        duration-1000
                                        ease-[cubic-bezier(87, 12, 84,1)]
                                        ease-out

                                        ${
                                            activeStep === index
                                                ? `
                                                    opacity-100
                                                    scale-100
                                                    translate-y-0
                                                    blur-0
                                                    z-10
                                                `
                                                : `
                                                    opacity-0
                                                    scale-110
                                                    translate-y-6
                                                    blur-[2px]
                                                    z-0
                                                `
                                        }
                                    `}
                                />

                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* MOBILE IMAGES */}

            <div className="mt-12 space-y-10 lg:hidden">

                {journeySteps.map((step, index) => (

                    <div
                        key={step.id ?? index}
                        className="
                            overflow-hidden
                            rounded-3xl
                            shadow-xl
                        "
                    >
                        <img
                            src={step.image}
                            alt={step.alt}
                            className="
                                aspect-video
                                w-full
                                object-cover
                            "
                        />
                    </div>

                ))}

            </div>

        </section>

    );

}