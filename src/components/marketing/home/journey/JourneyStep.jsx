import React from "react";

export default function JourneyStep({
    step,
    index,
    progress,
}) {

    const opacity = 0.35 + progress * 0.65;

    const translateY = (1 - progress) * 40;

    const scale = 0.95 + progress * 0.05;

    return (
        <div
            style={{
                opacity,
                transform: `
                    translateY(${translateY}px)
                    scale(${scale})
                `,
            }}
            className="
                flex
                min-h-screen
                items-center
                will-change-transform
            "
        >
            <div className="max-w-xl">

                {/* Step Number */}

                <div
                    className="
                        mb-8
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-[var(--gradient1-xebia)]
                        to-[var(--gradient2-xebia)]
                        text-xl
                        font-bold
                        text-white
                        shadow-[0_0_35px_rgba(108,29,95,.35)]
                    "
                >
                    {String(index + 1).padStart(2, "0")}
                </div>

                {/* Title */}

                <h2
                    className="
                        text-5xl
                        font-bold
                        leading-tight
                        tracking-tight
                        text-[var(--text-primary)]
                    "
                >
                    {step.title}
                </h2>

                {/* Description */}

                <p
                    className="
                        mt-8
                        text-xl
                        leading-9
                        text-[var(--text-secondary)]
                    "
                >
                    {step.description}
                </p>

            </div>
        </div>
    );
}