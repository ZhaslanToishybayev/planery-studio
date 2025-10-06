"use client";

interface DecorativeBlobProps {
  color?: "brand" | "purple" | "pink" | "green" | "orange";
  size?: "sm" | "md" | "lg" | "xl";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  animated?: boolean;
  opacity?: number;
}

export default function DecorativeBlob({
  color = "brand",
  size = "lg",
  position = "top-right",
  animated = true,
  opacity = 20,
}: DecorativeBlobProps) {
  const colorClasses = {
    brand: "from-[var(--brand-400)] to-[var(--brand-600)]",
    purple: "from-[var(--accent-purple)] to-[var(--accent-purple-light)]",
    pink: "from-[var(--accent-pink)] to-[var(--accent-pink-light)]",
    green: "from-[var(--accent-green)] to-[var(--accent-green-light)]",
    orange: "from-[var(--accent-orange)] to-[var(--accent-orange-light)]",
  };

  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[32rem] h-[32rem]",
  };

  const positionClasses = {
    "top-left": "-top-24 -left-24",
    "top-right": "-top-24 -right-24",
    "bottom-left": "-bottom-24 -left-24",
    "bottom-right": "-bottom-24 -right-24",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`
        absolute ${positionClasses[position]}
        -z-10 pointer-events-none
      `}
      style={{ opacity: opacity / 100 }}
    >
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full blur-3xl
          bg-gradient-to-br ${colorClasses[color]}
          ${animated ? "animate-blob" : ""}
        `}
      />
    </div>
  );
}
