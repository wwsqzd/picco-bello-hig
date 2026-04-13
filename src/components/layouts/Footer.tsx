"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { openingHours } from "../constants";
gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const top = topRef.current;
    const grid = gridRef.current;
    const bottom = bottomRef.current;

    if (!top || !grid || !bottom) return;

    const gridChildren = Array.from(grid.children);

    const ctx = gsap.context(() => {
      gsap.set([top, ...gridChildren, bottom], { clearProps: "all" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            once: true,
          },
        })
        .from(top, {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          gridChildren,
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .from(
          bottom,
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25",
        );
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/background2.jpg"
          alt="Pizza background"
          fill
          className="object-cover object-[60%_center] md:object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-8 lg:px-10">
        <div ref={topRef} className="mb-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <Image
              src="/mainlogo.png"
              alt="Picco Bello Logo"
              width={180}
              height={96}
              style={{ width: "auto" }}
              className="h-auto w-35 sm:w-40 md:w-45"
            />
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          <div>
            <h3 className="mb-5 text-xl font-bold uppercase tracking-wide text-white">
              Standort
            </h3>

            <div className="space-y-4 text-white/85">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#c10016]" />
                <div>
                  <p>Wilhelmstraße 86</p>
                  <p>37308 Heilbad Heiligenstadt, Deutschland</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold uppercase tracking-wide text-white">
              Öffnungszeiten
            </h3>

            <ul className="space-y-2 text-white/85">
              {openingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 text-sm sm:text-base"
                >
                  <span>{item.day}</span>
                  <span className="font-medium text-white">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold uppercase tracking-wide text-white">
              Kontakt
            </h3>

            <div className="space-y-4 text-white/85">
              <Link
                href="mailto:info@picco-bello-hig.de"
                className="flex items-center gap-3 transition hover:text-[#c10016]"
              >
                <FaEnvelope className="shrink-0 text-[#c10016]" />
                <span>info@picco-bello-hig.de</span>
              </Link>

              <Link
                href="tel:+4903606601144"
                className="flex items-center gap-3 transition hover:text-[#c10016]"
              >
                <FaPhoneAlt className="shrink-0 text-[#c10016]" />
                <span>03606 601144</span>
              </Link>

              <div className="pt-4">
                <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/60">
                  Folge uns
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href="https://www.facebook.com/people/Picco-Bello/100043020145548/"
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-[#c10016] hover:bg-[#c10016]"
                  >
                    <FaFacebookF />
                  </Link>

                  <Link
                    href="https://www.instagram.com/durumhaus_piccobello_hig?igsh=NTYwMm1ib2Y0dTN0"
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-[#c10016] hover:bg-[#c10016]"
                  >
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-white/10" />

        <div
          ref={bottomRef}
          className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
            <Link href="/" className="transition hover:text-[#c10016]">
              Home
            </Link>
            <Link href="/uber-uns" className="transition hover:text-[#c10016]">
              Über Uns
            </Link>
            <Link href="/menu" className="transition hover:text-[#c10016]">
              Menü
            </Link>
            <Link href="/impressum" className="transition hover:text-[#c10016]">
              Impressum
            </Link>
            <Link
              href="/datenschutzerklaerung"
              className="transition hover:text-[#c10016]"
            >
              Datenschutzerklärung
            </Link>
          </div>

          <p className="text-sm text-white/60">
            © {year} Picco Bello | Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};
