"use client";
import { LucideChevronLeft } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import "./header.style.scss";

export default function Header() {
  return (
    <header>
      <Button asChild variant="link">
        <Link href="/">
          <LucideChevronLeft size={24} />
          <span>Leave</span>
        </Link>
      </Button>
      <h1>Underwise Lifestar</h1>
      <Image src="/pax-logo.svg" alt="Pax Logo" width={80} height={48} />
    </header>
  );
}
