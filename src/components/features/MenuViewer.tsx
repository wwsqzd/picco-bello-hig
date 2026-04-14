/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { menuImages } from "../constants";

type Point = {
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.2;
const SWIPE_THRESHOLD = 60;

export default function MenuViewer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);

  const gestureRef = useRef({
    mode: "none" as "none" | "pan" | "pinch" | "swipe",
    startScale: 1,
    startDistance: 0,
    startOffset: { x: 0, y: 0 } as Point,
    startTouch: { x: 0, y: 0 } as Point,
    lastTapTime: 0,
    swipeDeltaX: 0,
    swipeDeltaY: 0,
  });

  const selectedImage =
    selectedIndex !== null ? menuImages[selectedIndex] : null;

  const canPrev = selectedIndex !== null && selectedIndex > 0;
  const canNext =
    selectedIndex !== null && selectedIndex < menuImages.length - 1;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const distanceBetweenTouches = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const goPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      const next = Math.max(0, prev - 1);
      return next;
    });
    resetView();
  };

  const goNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      const next = Math.min(menuImages.length - 1, prev + 1);
      return next;
    });
    resetView();
  };

  const zoomTo = (nextScale: number) => {
    const clamped = clamp(Number(nextScale.toFixed(2)), MIN_SCALE, MAX_SCALE);
    setScale(clamped);

    if (clamped === 1) {
      setOffset({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft" && canPrev) goPrev();
      if (e.key === "ArrowRight" && canNext) goNext();
    };

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, canPrev, canNext]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.18 : 0.18;
    zoomTo(scale + delta);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();

    setIsInteracting(true);

    if (e.touches.length === 2) {
      gestureRef.current.mode = "pinch";
      gestureRef.current.startDistance = distanceBetweenTouches(e.touches);
      gestureRef.current.startScale = scale;
      return;
    }

    if (e.touches.length !== 1) return;

    const touch = e.touches[0];

    if (now - gestureRef.current.lastTapTime < 260) {
      if (scale > 1) {
        zoomTo(1);
      } else {
        zoomTo(DOUBLE_TAP_SCALE);
      }
    }

    gestureRef.current.lastTapTime = now;
    gestureRef.current.startTouch = { x: touch.clientX, y: touch.clientY };
    gestureRef.current.startOffset = offset;
    gestureRef.current.swipeDeltaX = 0;
    gestureRef.current.swipeDeltaY = 0;
    gestureRef.current.mode = scale > 1 ? "pan" : "swipe";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const currentDistance = distanceBetweenTouches(e.touches);
      const ratio = currentDistance / (gestureRef.current.startDistance || 1);
      zoomTo(gestureRef.current.startScale * ratio);
      return;
    }

    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    const dx = touch.clientX - gestureRef.current.startTouch.x;
    const dy = touch.clientY - gestureRef.current.startTouch.y;

    if (gestureRef.current.mode === "pan" && scale > 1) {
      e.preventDefault();
      setOffset({
        x: gestureRef.current.startOffset.x + dx,
        y: gestureRef.current.startOffset.y + dy,
      });
      return;
    }

    if (gestureRef.current.mode === "swipe") {
      gestureRef.current.swipeDeltaX = dx;
      gestureRef.current.swipeDeltaY = dy;
    }
  };

  const handleTouchEnd = () => {
    const { mode, swipeDeltaX, swipeDeltaY } = gestureRef.current;

    if (mode === "swipe" && scale === 1) {
      const mostlyHorizontal = Math.abs(swipeDeltaX) > Math.abs(swipeDeltaY);

      if (mostlyHorizontal && Math.abs(swipeDeltaX) > SWIPE_THRESHOLD) {
        if (swipeDeltaX < 0 && canNext) goNext();
        if (swipeDeltaX > 0 && canPrev) goPrev();
      }
    }

    gestureRef.current.mode = "none";
    gestureRef.current.startDistance = 0;
    gestureRef.current.swipeDeltaX = 0;
    gestureRef.current.swipeDeltaY = 0;

    setIsInteracting(false);
  };

  const handleTouchCancel = () => {
    gestureRef.current.mode = "none";
    gestureRef.current.startDistance = 0;
    gestureRef.current.swipeDeltaX = 0;
    gestureRef.current.swipeDeltaY = 0;
    setIsInteracting(false);
  };

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/background3.webp"
            alt=""
            fill
            priority
            className="object-cover object-top scale-105"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/25" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="mx-auto w-full max-w-6xl px-6 pt-12 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Speisekarte
            </h1>
            <p className="mt-2 text-base text-neutral-200 md:text-lg">
              Tippe auf die Vorschau, um das Menü größer anzusehen.
            </p>
            <div className="mt-8 h-px w-full bg-black/5" />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center py-20">
        <article className="w-full max-w-3xl">
          <button
            type="button"
            onClick={() => openViewer(0)}
            className="block w-full cursor-pointer overflow-hidden rounded-2xl p-4 text-left transition hover:opacity-95"
          >
            <div className="flex justify-center overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="relative w-full max-w-155">
                <Image
                  src="/menu-1.png"
                  alt="Menü Vorschau"
                  width={620}
                  height={877}
                  priority
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </button>
        </article>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/88">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <button
              type="button"
              onClick={closeViewer}
              className="absolute top-3 right-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white sm:top-4 sm:right-4"
              aria-label="Schließen"
            >
              <LuX size={22} />
            </button>

            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              className="absolute top-1/2 left-2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white disabled:opacity-35 disabled:hover:bg-white/92 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Vorherige Seite"
            >
              <LuChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="absolute top-1/2 right-2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white disabled:opacity-35 disabled:hover:bg-white/92 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Nächste Seite"
            >
              <LuChevronRight size={24} />
            </button>

            <div
              ref={stageRef}
              className="relative flex h-full w-full items-center justify-center overflow-hidden px-14 py-20 sm:px-20 sm:py-24"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              style={{ touchAction: "none" }}
            >
              <img
                src={selectedImage.file}
                alt={selectedImage.title}
                draggable={false}
                className="select-none object-contain will-change-transform"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: isInteracting ? "none" : "transform 180ms ease",
                }}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/92 px-2 py-2 shadow-md backdrop-blur-sm sm:bottom-5">
              <button
                type="button"
                onClick={() => zoomTo(scale - 0.2)}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-neutral-800 transition hover:bg-black/5"
                aria-label="Verkleinern"
              >
                -
              </button>

              <button
                type="button"
                onClick={resetView}
                className="min-w-17.5 rounded-full px-3 py-1.5 text-center text-sm font-semibold text-neutral-700 transition hover:bg-black/5"
                aria-label="Zoom zurücksetzen"
              >
                {Math.round(scale * 100)}%
              </button>

              <button
                type="button"
                onClick={() => zoomTo(scale + 0.2)}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-neutral-800 transition hover:bg-black/5"
                aria-label="Vergrößern"
              >
                +
              </button>
            </div>

            <div className="absolute bottom-18 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/92 px-3 py-1 text-sm font-medium text-neutral-700 shadow-md backdrop-blur-sm sm:bottom-20">
              {selectedIndex! + 1} / {menuImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
