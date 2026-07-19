import { useEffect, useRef, useState } from "react";

import JourneyStep from "./JourneyStep";
import journeySteps from "./journeyData";

export default function JourneyTimeline() {

    const [timelineProgress, setTimelineProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const timelineRef = useRef(null);
    const stepRefs = useRef([]);

    useEffect(() => {

        function updateTimeline() {

            if (!timelineRef.current) return;

            const first = stepRefs.current[0];
            const last = stepRefs.current[stepRefs.current.length - 1];

            if (first && last) {

                const firstCenter =
                    first.offsetTop + first.offsetHeight / 2;

                const lastCenter =
                    last.offsetTop + last.offsetHeight / 2;

                const scrollCenter =
                    window.scrollY + window.innerHeight / 2;

                const progress =
                    (scrollCenter - firstCenter) /
                    (lastCenter - firstCenter);

                const clamped =
                    Math.max(0, Math.min(progress, 1));

                setTimelineProgress(clamped * 100);

            }

            let current = 0;
            let smallestDistance = Infinity;

            stepRefs.current.forEach((step, index) => {

                if (!step) return;

                const rect = step.getBoundingClientRect();

                const center =
                    rect.top + rect.height / 2;

                const distance =
                    Math.abs(center - window.innerHeight * 0.5);

                if (distance < smallestDistance) {

                    smallestDistance = distance;

                    current = index;

                }

            });

            setActiveStep(current);

        }

        updateTimeline();

        window.addEventListener("scroll", updateTimeline, {
            passive: true,
        });

        window.addEventListener("resize", updateTimeline);

        return () => {

            window.removeEventListener("scroll", updateTimeline);

            window.removeEventListener("resize", updateTimeline);

        };

    }, []);

    return (

        <section
                className="
                    relative
                    z-[1]
                    bg-[var(--background)]
                    px-[8%]
                    pb-28
                "
            >

                <div
                    ref={timelineRef}
                    className="relative mx-auto max-w-7xl"
                >

                    {/* Vertical Line */}

                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            hidden
                            h-full
                            w-[2px]
                            -translate-x-1/2
                            bg-black/20
                            lg:block
                        "
                    />
                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            hidden
                            w-[2px]
                            -translate-x-1/2
                            bg-gradient-to-b
                            from-[var(--gradient1-xebia)]
                            to-[var(--gradient2-xebia)]
                            lg:block
                        "
                        style={{
                            height: `${timelineProgress}%`,
                            transition: "height 80ms linear"
                        }}
                    />

                    <div className="space-y-28">

                        {journeySteps.map((step, index) => (

                            <JourneyStep
                                key={step.id}
                                ref={(el) => (stepRefs.current[index] = el)}
                                step={step}
                                index={index}
                                reverse={index % 2 === 1}
                                activeStep={activeStep}
                            />

                        ))}

                    </div>

                </div>

            </section>

    );

}