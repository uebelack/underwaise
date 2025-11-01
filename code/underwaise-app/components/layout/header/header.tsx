"use client";
import { LucideArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import "./header.style.scss";

export default function Header() {
  return (
    <header>
      <div className="content">
        <Button asChild variant="link">
          <Link href="/">
            <LucideArrowLeft size={24} />
            <span>Back</span>
          </Link>
        </Button>
        <h1>Underwise Lifestar</h1>
        <Image src="/pax-logo.svg" alt="Pax Logo" width={60} height={36} />
      </div>
    </header>
  );
}
