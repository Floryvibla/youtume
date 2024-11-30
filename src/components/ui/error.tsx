"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";

interface ErrorProps {
  message?: string;
}

export function Error({ message = "Something went wrong" }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-4">
      <p className="text-foreground/70">{message}</p>
      <Button variant="outline" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
