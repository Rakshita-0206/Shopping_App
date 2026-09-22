"use client";

import React from "react";
import Image from "next/image";

interface FabindiaOrnamentProps {
  className?: string;
  side?: "left" | "right";
}

/**
 * Authentic Fabindia Henna / Jali Ornamental Artwork
 * Matches Image 2 (the official Fabindia login screen) exactly:
 * - Left ornament: Anchored at bottom-left, pointing upward-inward (login-bg-side.png)
 * - Right ornament: Anchored at top-right, pointing downward-inward (login-bg-side-down.png)
 */
export default function FabindiaOrnament({
  className = "",
  side = "left",
}: FabindiaOrnamentProps) {
  const isLeft = side === "left";
  const src = isLeft
    ? "/images/login-bg-side.png"
    : "/images/login-bg-side-down.png";
  const alt = isLeft
    ? "Fabindia Motif Bottom Left"
    : "Fabindia Motif Top Right";

  return (
    <div
      className={`pointer-events-none select-none ${
        isLeft ? "bottom-left-image" : "top-right-image"
      } ${className}`}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        width={349}
        height={509}
        priority
        className="w-[180px] sm:w-[240px] md:w-[300px] lg:w-[349px] h-auto object-contain pointer-events-none select-none transition-opacity duration-300"
      />
    </div>
  );
}
