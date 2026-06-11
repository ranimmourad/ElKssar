"use client";

import { usePathname } from "next/navigation";
import FooterContent from "./FooterContent";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/EL-KSSAR")) return null;
  return <FooterContent />;
}
