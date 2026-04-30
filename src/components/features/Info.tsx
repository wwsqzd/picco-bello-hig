export const Info = () => {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c10016]">
              Kontakt & Bestellung
            </p>

            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#c10016] sm:text-4xl">
              Schnell. Einfach. Lecker.
            </h2>

            <p className="mt-4 max-w-md text-base leading-7 text-neutral-700">
              Bestelle dein Essen ganz unkompliziert online oder ruf uns direkt
              an. Wir bereiten alles frisch zu — zum Mitnehmen oder zur
              Lieferung.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#c10016] px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 cursor-pointer"
              >
                <span
                  data-glf-cuid="9d4ec754-5189-4b4e-9f36-aa89e65f4cf4"
                  data-glf-ruid="f2938ae7-672e-4cd0-8ca8-96b809b40106"
                  id="glfButton0"
                >
                  Online bestellen
                </span>
              </button>

              <a
                href="tel:03606 601144"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:-translate-y-0.5"
              >
                Anrufen
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c10016]">
                Telefon
              </p>

              <a
                href="tel:+491234567890"
                className="mt-2 block text-2xl font-bold text-neutral-900 sm:text-3xl"
              >
                03606 601144
              </a>
            </div>

            <div className="grid gap-3 text-sm text-neutral-700">
              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span>Lieferung</span>
                <span className="font-semibold text-neutral-900">
                  Verfügbar
                </span>
              </div>

              <div className="flex justify-between border-b border-neutral-200 pb-2">
                <span>Take Away</span>
                <span className="font-semibold text-neutral-900">
                  Jederzeit
                </span>
              </div>

              <div className="flex justify-between">
                <span>Standort</span>
                <span className="font-semibold text-neutral-900">
                  Heiligenstadt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
