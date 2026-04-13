import { CustomerReviews } from "@/components/features/CustomerReviews";
import { MapSection } from "@/components/features/Map";
import { Start } from "@/components/features/Start";
import { Info } from "@/components/features/Info";

export default function HomePage() {
  return (
    <>
      <Start />
      <Info />
      <CustomerReviews />
      <MapSection />
    </>
  );
}
