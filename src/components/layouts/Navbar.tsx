"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuAlignJustify, LuX } from "react-icons/lu";
import { navItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const mobileMenu = mobileMenuRef.current;

    if (!header || !mobileMenu) return;

    const ctx = gsap.context(() => {
      gsap.set(mobileMenu, {
        xPercent: 100,
        display: "none",
      });

      gsap.set(header, {
        backgroundColor: "rgba(255,255,255,0)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top-=80",
        onEnter: () => {
          setIsScrolled(true);

          gsap.to(header, {
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          setIsScrolled(false);

          gsap.to(header, {
            backgroundColor: "rgba(255,255,255,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      const initialScrolled = window.scrollY > 80;
      setIsScrolled(initialScrolled);

      if (initialScrolled) {
        gsap.set(header, {
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        });
      }
    });

    return () => {
      menuTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    menuTweenRef.current?.kill();

    if (isOpen) {
      gsap.set(menu, { display: "flex" });

      menuTweenRef.current = gsap.to(menu, {
        xPercent: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    } else {
      menuTweenRef.current = gsap.to(menu, {
        xPercent: 100,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }

    return () => {
      menuTweenRef.current?.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header ref={headerRef} className="left-0 top-0 z-50 w-full fixed">
      <nav
        className={`mx-auto flex min-h-19 items-center px-4 py-3 sm:px-5 ${
          isOpen ? "justify-baseline gap-4" : "justify-around"
        }`}
      >
        <Link href="/" className="z-60 flex shrink-0 items-center gap-3">
          <Image
            src="/mainlogo.png"
            alt="Logo"
            width={150}
            height={100}
            priority
            className="h-auto w-29.5 xs:w-[124px] sm:w-33 md:w-36.25 transition-all duration-300"
            style={{ height: "auto" }}
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`uppercase font-bold transition-all duration-200 ease-out hover:text-[#c10016] md:hover:-translate-y-0.5 ${
                isScrolled ? "text-neutral-900" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`z-60 ml-auto inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full md:hidden ${
            isScrolled || isOpen ? "text-neutral-900" : "text-white"
          }`}
        >
          {isOpen ? <LuX size={30} /> : <LuAlignJustify size={30} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="fixed right-0 top-0 z-50 hidden h-screen w-full flex-col bg-white px-6 pb-8 pt-24 shadow-2xl md:hidden"
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-2 py-3 text-[1.05rem] uppercase font-bold leading-none transition hover:text-[#c10016]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
