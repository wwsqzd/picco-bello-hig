import { FoodCard } from "@/components/features/FoodCard";
import Image from "next/image";
import { products } from "@/components/constants";

export default function NeuesPage() {
  return (
    <>
      {/*header */}
      <section className="relative overflow-hidden sm:px-6 lg:px-8 pt-24">
        <div className="absolute bg-black inset-0 -z-10">
          <Image
            src="/background6.webp"
            alt=""
            fill
            priority
            placeholder="empty"
            className="object-cover object-[center_80%] scale-105"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/25" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="max-w-6xl w-full mx-auto px-6 pt-12 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Tiefgekühlte Spezialitäten
            </h1>
            <p className="text-neutral-200 mt-2 text-base md:text-lg">
              Ab sofort gibt es unsere leckeren osteuropäischen Spezialitäten
              als Tiefkühlprodukte. Perfekt für zu Hause: einfach lagern,
              schnell zubereiten und jederzeit frisch genießen.
            </p>
            <div className="h-px w-full bg-black/5 mt-8" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, i) => (
              <FoodCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
