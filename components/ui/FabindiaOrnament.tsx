"use client";

import React from "react";

interface FabindiaOrnamentProps {
  className?: string;
  side?: "left" | "right";
}

/**
 * Authentic Fabindia Henna / Mandala Ornamental Artwork
 * Exactly matching the official Fabindia visual identity (downward-pointed floral paisley,
 * internal ladder ribs, triple vertical dots, layered lotus petals, and radiating teardrop beads).
 */
export default function FabindiaOrnament({
  className = "",
  side = "right",
}: FabindiaOrnamentProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`pointer-events-none select-none ${
        isLeft ? "scale-x-[-1]" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        width="380"
        height="560"
        viewBox="0 0 380 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#CAA69E]"
      >
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* ================================================================= */}
          {/* 1. CENTRAL ALMOND / EYE VESICA PISCIS (Ladder Ribs & Triple Dots) */}
          {/* ================================================================= */}
          {/* Outer almond border */}
          <path d="M 270 40 C 205 150 225 295 270 355 C 315 295 335 150 270 40 Z" />

          {/* Inner almond border */}
          <path d="M 270 58 C 218 155 236 280 270 338 C 304 280 322 155 270 58 Z" />

          {/* Top arch accents inside almond */}
          <path d="M 248 95 C 248 68 292 68 292 95" />
          <path d="M 254 95 C 254 78 286 78 286 95" />

          {/* Horizontal ladder shading ribs */}
          <path d="M 235 106 L 305 106" />
          <path d="M 231 118 L 309 118" />
          <path d="M 229 130 L 311 130" />
          <path d="M 227 142 L 313 142" />
          <path d="M 227 154 L 313 154" />
          <path d="M 228 166 L 312 166" />
          <path d="M 230 178 L 310 178" />
          <path d="M 233 190 L 307 190" />
          <path d="M 237 202 L 303 202" />
          <path d="M 242 214 L 298 214" />
          <path d="M 248 226 L 292 226" />
          <path d="M 255 238 L 285 238" />

          {/* Internal lower framing loop for dots */}
          <path d="M 270 240 C 256 258 256 284 270 302 C 284 284 284 258 270 240 Z" />

          {/* Triple vertical dots inside lower apex */}
          <circle cx="270" cy="254" r="3" fill="currentColor" stroke="none" />
          <circle cx="270" cy="270" r="4.5" fill="currentColor" stroke="none" />
          <circle cx="270" cy="286" r="2.5" fill="currentColor" stroke="none" />

          {/* ================================================================= */}
          {/* 2. INNER LAYER LOTUS PETALS (Hugging the Central Almond) */}
          {/* ================================================================= */}
          {/* Bottom apex petal hugging almond tip */}
          <path d="M 250 325 C 238 355 255 382 270 398 C 285 382 302 355 290 325" />

          {/* Left petals tier 1 */}
          <path d="M 232 265 C 202 282 196 318 226 338 C 238 325 245 302 240 278" />
          <path d="M 225 190 C 182 205 174 242 206 268 C 220 250 230 225 228 200" />
          <path d="M 232 118 C 186 128 178 165 212 192 C 226 175 232 148 233 128" />
          <path d="M 254 52 C 206 62 198 98 230 122 C 246 108 255 84 255 60" />

          {/* Right petals tier 1 (mirrored) */}
          <path d="M 308 265 C 338 282 344 318 314 338 C 302 325 295 302 300 278" />
          <path d="M 315 190 C 358 205 366 242 334 268 C 320 250 310 225 312 200" />
          <path d="M 308 118 C 354 128 362 165 328 192 C 314 175 308 148 307 128" />
          <path d="M 286 52 C 334 62 342 98 310 122 C 294 108 285 84 285 60" />

          {/* ================================================================= */}
          {/* 3. OUTER LAYER POINTED LOTUS PETALS WITH INNER ECHO LINES */}
          {/* ================================================================= */}
          {/* Bottom pointed petal */}
          <path d="M 232 360 C 232 402 256 428 270 442 C 284 428 308 402 308 360" />
          <path d="M 242 370 C 242 398 258 418 270 430 C 282 418 298 398 298 370" />

          {/* Left outer petals */}
          <path d="M 205 320 C 160 334 165 382 208 402 C 224 382 230 354 220 330" />
          <path d="M 200 335 C 172 344 176 374 204 390 C 216 376 220 356 212 340" />

          <path d="M 186 238 C 136 252 142 304 186 324 C 200 304 206 270 196 246" />
          <path d="M 182 252 C 152 262 154 294 184 310 C 196 294 198 270 190 256" />

          <path d="M 188 152 C 138 162 142 214 186 238 C 200 216 206 182 196 162" />
          <path d="M 182 166 C 152 174 154 206 184 224 C 196 208 198 186 190 172" />

          <path d="M 210 68 C 156 78 160 130 205 155 C 220 135 225 96 218 78" />
          <path d="M 205 82 C 172 90 174 124 202 142 C 215 125 218 102 212 88" />

          {/* Right outer petals (mirrored) */}
          <path d="M 335 320 C 380 334 375 382 332 402 C 316 382 310 354 320 330" />
          <path d="M 340 335 C 368 344 364 374 336 390 C 324 376 320 356 328 340" />

          <path d="M 354 238 C 404 252 398 304 354 324 C 340 304 334 270 344 246" />
          <path d="M 358 252 C 388 262 386 294 356 310 C 344 294 342 270 350 256" />

          <path d="M 352 152 C 402 162 398 214 354 238 C 340 216 334 182 344 162" />
          <path d="M 358 166 C 388 174 386 206 356 224 C 344 208 342 186 350 172" />

          {/* ================================================================= */}
          {/* 4. TEARDROP BEADS (Hanging & Perimeter Radiating Droplets) */}
          {/* ================================================================= */}
          {/* Central bottom hanging teardrop bead */}
          <path d="M 270 452 C 264 463 260 473 260 480 A 10 10 0 0 0 280 480 C 280 473 276 463 270 452 Z" />

          {/* Flanking lower hanging teardrops */}
          <path d="M 235 415 C 228 425 220 433 218 439 A 8 8 0 0 0 232 447 C 237 440 240 428 235 415 Z" />
          <path d="M 305 415 C 312 425 320 433 322 439 A 8 8 0 0 1 308 447 C 303 440 300 428 305 415 Z" />

          {/* Side perimeter teardrops */}
          <path d="M 188 375 C 180 384 170 390 168 396 A 7 7 0 0 0 180 404 C 185 397 188 387 188 375 Z" />
          <path d="M 152 295 C 142 300 132 308 130 314 A 7 7 0 0 0 142 322 C 147 315 151 306 152 295 Z" />
          <path d="M 150 205 C 140 208 130 216 128 222 A 7 7 0 0 0 140 230 C 146 224 149 215 150 205 Z" />
          <path d="M 172 118 C 162 120 150 128 148 134 A 7 7 0 0 0 160 142 C 166 136 170 127 172 118 Z" />

          {/* Mirrored right side perimeter teardrops */}
          <path d="M 352 375 C 360 384 370 390 372 396 A 7 7 0 0 1 360 404 C 355 397 352 387 352 375 Z" />
          <path d="M 388 295 C 398 300 408 308 410 314 A 7 7 0 0 1 398 322 C 393 315 389 306 388 295 Z" />
        </g>
      </svg>
    </div>
  );
}
