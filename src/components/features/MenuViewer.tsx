"use client";

import Image from "next/image";
import { LuDownload, LuFileType2 } from "react-icons/lu";

export default function MenuViewer() {
  const pdfUrl = "/menu.pdf";

  return (
    <>
      {/* header */}
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

      <section className="mx-auto flex max-w-6xl flex-col items-center py-12 px-4 sm:py-20">
        <article className="w-full max-w-3xl">
          <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <div className="relative w-full">
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10 sm:bg-black/0">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
                    PDF öffnen
                  </span>
                </div>

                <Image
                  src="/menu-1.png"
                  alt="Menü Vorschau"
                  width={620}
                  height={877}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </a>

            <div className="flex flex-col gap-3 border-t border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <LuFileType2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Speisekarte
                  </p>
                  <p className="text-xs text-neutral-500">PDF-Dokument</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-95 shadow-md"
                >
                  <LuDownload size={18} />
                  Herunterladen
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
