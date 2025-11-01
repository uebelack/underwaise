"use client";
import { LucidePhoneCall } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import "./header.style.scss";

export default function Header() {
  return (
    <header>
      <div className="content">
        <Link href="/">
          <Image src="/pax-logo.svg" alt="Pax Logo" width={50} height={36} />
        </Link>
        <div className="spacer" />
        <h1>Spar Lebensversicherung</h1>
        <Button
          asChild
          variant="default"
          className="advice bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Link href="tel:+49123456789">
            <LucidePhoneCall size={24} />
            <span>Advice</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
