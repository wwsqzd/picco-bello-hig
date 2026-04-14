/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { menuImages } from "../constants";

const SWIPE_THRESHOLD = 50;

export default function MenuViewer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const selectedImage =
    selectedIndex !== null ? menuImages[selectedIndex] : null;

  const canPrev = selectedIndex !== null && selectedIndex > 0;
  const canNext =
    selectedIndex !== null && selectedIndex < menuImages.length - 1;

  const openViewer = (index: number) => {
    setIsLoading(true);
    setSelectedIndex(index);
  };

  const closeViewer = () => {
    setSelectedIndex(null);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return Math.max(0, prev - 1);
    });
  };

  const goNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return Math.min(menuImages.length - 1, prev + 1);
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft" && canPrev) goPrev();
      if (e.key === "ArrowRight" && canNext) goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, canPrev, canNext]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isStrongEnough = Math.abs(deltaX) > SWIPE_THRESHOLD;

    if (isHorizontalSwipe && isStrongEnough) {
      if (deltaX < 0 && canNext) goNext();
      if (deltaX > 0 && canPrev) goPrev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
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
            aria-label="Menü öffnen"
          >
            <div className="flex justify-center overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="relative w-full max-w-[620px]">
                <div className="absolute inset-0 animate-pulse bg-neutral-200" />

                <Image
                  src="/menu-1.png"
                  alt="Menü Vorschau"
                  width={620}
                  height={877}
                  priority
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="relative z-10 h-auto w-full object-contain"
                />
              </div>
            </div>
          </button>
        </article>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-100 bg-black/90"
          role="dialog"
          aria-modal="true"
          aria-label="Menüansicht"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <button
              type="button"
              onClick={closeViewer}
              className="absolute top-3 right-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white sm:top-4 sm:right-4 cursor-pointer"
              aria-label="Schließen"
            >
              <LuX size={22} />
            </button>

            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              className="absolute top-1/2 left-2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white disabled:cursor-default disabled:opacity-35 sm:left-4 sm:h-12 sm:w-12 cursor-pointer"
              aria-label="Vorherige Seite"
            >
              <LuChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="absolute top-1/2 right-2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white disabled:cursor-default disabled:opacity-35 sm:right-4 sm:h-12 sm:w-12 cursor-pointer"
              aria-label="Nächste Seite"
            >
              <LuChevronRight size={24} />
            </button>

            <div
              className="flex h-full w-full items-center justify-center px-14 py-20 sm:px-20 sm:py-24"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
                  <div className="flex flex-col items-center gap-3 text-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="text-sm font-medium">Wird geladen...</span>
                  </div>
                </div>
              )}
              <img
                src={selectedImage.file}
                alt={selectedImage.title}
                onLoad={() => setIsLoading(false)}
                draggable={false}
                className="block max-h-full max-w-full select-none object-contain"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-neutral-700 shadow-md backdrop-blur-sm sm:bottom-5">
              {selectedIndex! + 1} / {menuImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
