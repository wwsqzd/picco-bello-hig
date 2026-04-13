export const MapSection = () => {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Standort
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Wilhelmstraße 86, 37308 Heilbad Heiligenstadt
          </p>
        </div>

        <div className="h-70 w-full sm:h-80 lg:h-90 overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps?q=Wilhelmstraße+86,+37308+Heilbad+Heiligenstadt&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
