

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: any;
}

export function Marquee({
    className,
    reverse,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={`group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ${vertical ? "flex-col" : "flex-row"
                } ${className || ""}`}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={`flex shrink-0 justify-around [gap:var(--gap)] ${vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row"
                            } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${reverse ? "[animation-direction:reverse]" : ""
                            }`}
                    >
                        {children}
                    </div>
                ))}
            <style jsx global>{`
            @keyframes marquee {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(calc(-100% - var(--gap)));
                }
            }
            @keyframes marquee-vertical {
                from {
                    transform: translateY(0);
                }
                to {
                    transform: translateY(calc(-100% - var(--gap)));
                }
            }
            .animate-marquee {
                animation: marquee var(--duration) linear infinite;
            }
            .animate-marquee-vertical {
                animation: marquee-vertical var(--duration) linear infinite;
            }
        `}</style>
        </div>
    );
}
