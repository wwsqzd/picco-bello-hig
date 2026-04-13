"use client";

import { useEffect, useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuStar } from "react-icons/lu";
import { reviews } from "../constants";

function getCardsPerPage(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export const CustomerReviews = () => {
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const nextCardsPerPage = getCardsPerPage(window.innerWidth);
      const nextTotalPages = Math.ceil(reviews.length / nextCardsPerPage);

      setCardsPerPage(nextCardsPerPage);
      setCurrentPage((prev) => Math.min(prev, nextTotalPages - 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < reviews.length; i += cardsPerPage) {
      chunks.push(reviews.slice(i, i + cardsPerPage));
    }
    return chunks;
  }, [cardsPerPage]);

  const totalPages = pages.length;

  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [totalPages]);

  const goPrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c10016]">
            Kundenbewertungen
          </p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#c10016] sm:text-4xl lg:text-5xl">
            Was unsere Kunden sagen
          </h2>
        </div>

        <div className="relative">
          <div className="mb-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Vorherige Bewertungen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 transition hover:-translate-y-0.5 cursor-pointer"
            >
              <LuChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Nächste Bewertungen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 transition hover:-translate-y-0.5 cursor-pointer"
            >
              <LuChevronRight size={22} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 gap-4 sm:gap-5 lg:gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))`,
                  }}
                >
                  {page.map((review, index) => (
                    <article
                      key={`${review.name}-${index}`}
                      className="flex min-h-60 flex-col rounded-2xl bg-neutral-50 p-6 sm:min-h-65 sm:p-7"
                    >
                      <div className="mb-4 flex items-center gap-1 text-[#f4a300]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <LuStar key={i} size={18} fill="currentColor" />
                        ))}
                      </div>

                      <p className="flex-1 text-base leading-7 text-neutral-700">
                        “{review.text}”
                      </p>

                      <div className="mt-6 pt-4">
                        <p className="font-bold text-neutral-900">
                          {review.name}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Gehe zu Slide ${index + 1}`}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2.5 w-2.5 rounded-full cursor-pointer transition ${
                    currentPage === index ? "bg-[#c10016]" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
