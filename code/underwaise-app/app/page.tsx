import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 py-8 px-4">
      <Button asChild>
        <Link href="/lifestar">Apply for Life Insurance</Link>
      </Button>
    </div>
  );
}
