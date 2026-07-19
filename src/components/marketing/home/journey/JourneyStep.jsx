import React, { forwardRef } from "react";

const JourneyStep = forwardRef(
    (
        {
            step,
            index,
            reverse,
            activeStep,
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={`
                    relative
                    grid
                    items-center
                    gap-14
                    lg:grid-cols-2
                    ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
                `}
            >
                {/* Text */}

                <div
                    className={`
                        px-2
                        transition-all
                        duration-700

                        ${
                            activeStep >= index
                                ? `
                                    opacity-100
                                    translate-y-0
                                `
                                : `
                                    opacity-0
                                    translate-y-10
                                `
                        }
                    `}
                >
                    <div
                        className={`
                            mb-6
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            text-lg
                            font-bold
                            transition-all
                            duration-500

                            ${
                                activeStep >= index
                                    ? `
                                        scale-110
                                        bg-gradient-to-r
                                        from-[var(--gradient1-xebia)]
                                        to-[var(--gradient2-xebia)]
                                        text-white
                                        shadow-[0_0_30px_rgba(108,29,95,.45)]
                                    `
                                    : `
                                        scale-100
                                        bg-gray-200
                                        text-gray-500
                                    `
                            }
                        `}
                    >
                        {index + 1}
                    </div>

                    <h3
                        className={`
                            text-4xl
                            font-bold
                            tracking-tight
                            text-[var(--text-primary)]
                            transition-all
                            duration-500

                            ${
                                activeStep >= index
                                    ? "translate-x-0"
                                    : "-translate-x-4"
                            }

                            lg:text-4xl
                        `}
                    >
                        {step.title}
                    </h3>

                    <p
                        className={`
                            mt-6
                            max-w-xl
                            text-lg
                            leading-9
                            text-[var(--text-secondary)]
                            transition-all
                            duration-700
                            delay-100

                            ${
                                activeStep >= index
                                    ? "opacity-100"
                                    : "opacity-50"
                            }
                        `}
                    >
                        {step.description}
                    </p>
                </div>

                {/* Screenshot */}

                <div
                    className={`
                        group
                        overflow-hidden
                        rounded-3xl
                        border
                        border-black/10
                        bg-[var(--background)]
                        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                        transition-all
                        duration-700

                        ${
                            activeStep >= index
                                ? `
                                    translate-y-0
                                    scale-100
                                    opacity-100
                                `
                                : `
                                    translate-y-6
                                    scale-[0.98]
                                    opacity-60
                                `
                        }

                        hover:-translate-y-3
                        hover:scale-[1.02]
                        hover:shadow-[0_35px_90px_rgba(108,29,95,.22)]
                    `}
                >
                    <img
                        src={step.image}
                        alt={step.alt}
                        className={`
                            aspect-video
                            w-full
                            object-cover
                            transition-all
                            duration-700

                            ${
                                activeStep >= index
                                    ? "scale-100"
                                    : "scale-[1.02]"
                            }

                            group-hover:scale-105
                        `}
                    />
                </div>

                {/* Timeline Dot */}

                <div
                    className={`
                        absolute
                        left-1/2
                        top-1/2
                        hidden
                        h-5
                        w-5
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border-4
                        border-[var(--background)]
                        transition-all
                        duration-500
                        lg:block

                        ${
                            activeStep >= index
                                ? `
                                    scale-125
                                    bg-[var(--primary-color)]
                                    ring-8
                                    ring-[rgba(108,29,95,.18)]
                                    shadow-[0_0_25px_rgba(108,29,95,.35)]
                                `
                                : `
                                    scale-100
                                    bg-white
                                    border-2
                                    border-gray-300
                                `
                        }
                    `}
                />
            </div>
        );
    }
);

JourneyStep.displayName = "JourneyStep";

export default JourneyStep;