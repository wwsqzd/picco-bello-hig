import { FoodItem } from "@/types/schared";
import Image from "next/image";

type FoodCardProps = {
  item: FoodItem;
};

export const FoodCard = ({ item }: FoodCardProps) => {
  return (
    <div className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        <Image
          src={item.src}
          alt={item.category}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="font-bold text-lg text-neutral-900 uppercase tracking-wide border-b border-neutral-100 pb-2 mb-4">
          {item.category}
        </h3>

        <ul className="space-y-2.5">
          {item.items.map((p, j) => (
            <li
              key={j}
              className="text-sm text-neutral-600 flex items-start gap-3 leading-snug"
            >
              <span className="w-1.5 h-1.5 bg-[#c10016] rounded-full mt-1.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
