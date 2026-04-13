"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { menuImages } from "../constants";

export default function MenuViewer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(900);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setContainerWidth(window.innerWidth - 24);
        return;
      }
      if (window.innerWidth < 1024) {
        setContainerWidth(window.innerWidth - 64);
        return;
      }
      setContainerWidth(900);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => {
          if (prev === null) return 0;
          return Math.max(0, prev - 1);
        });
      }

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => {
          if (prev === null) return 0;
          return Math.min(menuImages.length - 1, prev + 1);
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex]);

  const canPrev = selectedIndex !== null && selectedIndex > 0;
  const canNext =
    selectedIndex !== null && selectedIndex < menuImages.length - 1;

  const viewerWidth = useMemo(() => {
    if (containerWidth < 420) return containerWidth;
    if (containerWidth < 768) return containerWidth - 8;
    return Math.min(860, containerWidth);
  }, [containerWidth]);

  const selectedImage =
    selectedIndex !== null ? menuImages[selectedIndex] : null;

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/background3.jpg"
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
              Klicke auf die Vorschau, um das Menü größer anzusehen.
            </p>
            <div className="mt-8 h-px w-full bg-black/5" />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center">
        <article className="w-full max-w-3xl">
          <button
            type="button"
            onClick={() => {
              setSelectedIndex(0);
              setScale(1);
            }}
            className="block w-full cursor-pointer overflow-hidden rounded-2xl p-4 text-left transition"
          >
            <div className="flex justify-center overflow-hidden rounded-xl bg-white">
              <div className="relative aspect-210/297 w-full max-w-155 flex items-center">
                <Image
                  src="/menu-1.jpg"
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
        <div className="fixed inset-0 z-100 bg-black/75 p-2 sm:p-4">
          <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center overflow-hidden rounded-2xl bg-neutral-50">
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 backdrop-blur-sm sm:top-4 sm:right-4"
              aria-label="Schließen"
            >
              <LuX size={22} />
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === null ? 0 : Math.max(0, prev - 1),
                )
              }
              disabled={!canPrev}
              className="absolute top-1/2 left-2 z-20 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 backdrop-blur-sm disabled:cursor-default disabled:opacity-35 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Vorherige Seite"
            >
              <LuChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === null ? 0 : Math.min(menuImages.length - 1, prev + 1),
                )
              }
              disabled={!canNext}
              className="absolute top-1/2 right-2 z-20 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 backdrop-blur-sm disabled:cursor-default disabled:opacity-35 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Nächste Seite"
            >
              <LuChevronRight size={24} />
            </button>

            <div className="flex h-full w-full items-center justify-center overflow-auto p-4 sm:p-10">
              <div className="rounded-xl bg-white p-2 sm:p-4">
                <div
                  className="relative mx-auto origin-center transition-transform duration-200"
                  style={{
                    width: viewerWidth,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div className="relative aspect-210/297 w-full">
                    <Image
                      src={selectedImage.file}
                      alt={selectedImage.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 860px"
                      className="rounded-md object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-2 py-2 backdrop-blur-sm sm:bottom-4">
              <button
                type="button"
                onClick={() =>
                  setScale((prev) => Math.max(0.8, +(prev - 0.1).toFixed(2)))
                }
                className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-neutral-800"
                aria-label="Verkleinern"
              >
                -
              </button>

              <span className="min-w-14.5 text-center text-sm font-medium text-neutral-700">
                {Math.round(scale * 100)}%
              </span>

              <button
                type="button"
                onClick={() =>
                  setScale((prev) => Math.min(2.2, +(prev + 0.1).toFixed(2)))
                }
                className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-neutral-800"
                aria-label="Vergrößern"
              >
                +
              </button>
            </div>

            <div className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-neutral-700 backdrop-blur-sm sm:bottom-18">
              {selectedIndex! + 1} / {menuImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
