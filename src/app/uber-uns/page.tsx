"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { sections } from "@/components/constants";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [active, setActive] = useState(0);
  const desktopPinRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mmRef = useRef<gsap.MatchMedia | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      mmRef.current = gsap.matchMedia();

      mmRef.current.add("(min-width: 1024px)", () => {
        const pinEl = desktopPinRef.current;
        if (!pinEl) return;

        const trigger = ScrollTrigger.create({
          trigger: pinEl,
          start: "top 200px",
          end: `+=${sections.length * window.innerHeight * 0.8}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              Math.floor(self.progress * sections.length),
              sections.length - 1,
            );

            setActive((prev) => (prev !== nextIndex ? nextIndex : prev));
          },
        });

        return () => {
          trigger.kill();
        };
      });
    });

    return () => {
      mmRef.current?.revert();
      ctx.revert();
    };
  }, []);
  // animation for content
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [active]);

  const current = sections[active];

  return (
    <>
      <section className="relative overflow-hidden sm:px-6 lg:px-8 pt-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/background4.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_80%] scale-105"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/25" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="max-w-6xl w-full mx-auto px-6 pt-12 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Unsere Geschichte
            </h1>
            <p className="text-neutral-200 mt-2 text-base md:text-lg">
              Zwei Menschen, unterschiedliche Wege, eine Leidenschaft.
            </p>
            <div className="h-px w-full bg-black/5 mt-8" />
          </div>
        </div>
      </section>
      <section className="w-full bg-white lg:min-h-screen flex flex-col overflow-x-hidden">
        <section
          ref={desktopPinRef}
          className="hidden lg:grid max-w-6xl w-full mx-auto grid-cols-[250px_1fr] gap-12 px-6 flex-1 items-start pt-10"
        >
          <aside className="space-y-8 border-l-2 border-black/5 pl-6 relative">
            {sections.map((s, i) => (
              <div
                key={s.id}
                className={`transition-all duration-500 ${i === active ? "text-[#c10016] translate-x-2" : "text-neutral-400"}`}
              >
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                  {s.step}
                </p>
                <p className="text-sm font-bold mt-1">{s.label}</p>
                {i === active && (
                  <div className="absolute -left-6.5 top-2 w-3 h-3 bg-[#c10016] rounded-full" />
                )}
              </div>
            ))}
          </aside>

          <article className="bg-neutral-50 rounded-3xl p-10 border border-black/5 shadow-sm min-h-112.5 flex flex-col justify-center">
            <div ref={contentRef}>
              <span className="text-[#c10016] text-xs font-bold uppercase tracking-widest">
                {current.label}
              </span>
              <h2 className="text-3xl font-extrabold mt-4 leading-tight text-neutral-900">
                {current.title}
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600 text-lg leading-relaxed">
                {current.paragraphs.map((p, i) => (
                  <p key={`${active}-${i}`}>{p}</p>
                ))}
              </div>
            </div>
          </article>
        </section>
        {/* mobile section hide */}
        <section className="lg:hidden px-4 pt-25 pb-12 space-y-6">
          <div className="flex justify-between items-center sticky top-26.25 z-10 bg-white/90 backdrop-blur-md py-4 border-b border-black/5">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className="p-2 bg-neutral-100 rounded-full disabled:opacity-20"
            >
              <LuChevronLeft size={20} />
            </button>
            <div className="text-center leading-tight">
              <span className="text-[10px] font-bold text-[#c10016] uppercase">
                {current.step}
              </span>
              <p className="text-xs font-bold truncate max-w-37.5">
                {current.label}
              </p>
            </div>
            <button
              onClick={() =>
                setActive(Math.min(sections.length - 1, active + 1))
              }
              disabled={active === sections.length - 1}
              className="p-2 bg-neutral-100 rounded-full disabled:opacity-20"
            >
              <LuChevronRight size={20} />
            </button>
          </div>

          <article className="bg-neutral-50 rounded-2xl p-6 border border-black/5 shadow-sm min-h-75">
            <h2 className="text-xl font-bold leading-tight text-neutral-900">
              {current.title}
            </h2>
            <div className="mt-4 space-y-3 text-neutral-600 text-sm leading-relaxed">
              {current.paragraphs.map((p, i) => (
                <p key={`${active}-${i}`}>{p}</p>
              ))}
            </div>
            <div className="flex gap-1.5 mt-8 justify-center">
              {sections.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-[#c10016]" : "w-2 bg-neutral-200"}`}
                />
              ))}
            </div>
          </article>
        </section>
      </section>
    </>
  );
}
