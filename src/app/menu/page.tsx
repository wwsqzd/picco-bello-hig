"use client";
import dynamic from "next/dynamic";

const MenuViewer = dynamic(() => import("@/components/features/MenuViewer"), {
  ssr: false,
});

export default function MenuPage() {
  return <MenuViewer />;
}
