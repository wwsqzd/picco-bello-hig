"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const Start = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );
    }, container);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={container}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <Image
        src="/background1.webp"
        alt="Frische Pizza"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-white">
        <h1
          ref={titleRef}
          className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
        >
          Frische Pizza – heiß geliefert
        </h1>

        <p
          ref={textRef}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl"
        >
          Schnell und direkt zu dir nach Hause
        </p>

        <button
          type="button"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#c10016] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:scale-[1.03] hover:bg-[#a80013] cursor-pointer"
        >
          <span
            data-glf-cuid="9d4ec754-5189-4b4e-9f36-aa89e65f4cf4"
            data-glf-ruid="f2938ae7-672e-4cd0-8ca8-96b809b40106"
            id="glfButton0"
          >
            Online bestellen
          </span>
        </button>
      </div>
    </section>
  );
};
