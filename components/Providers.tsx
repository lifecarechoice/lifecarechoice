"use client";

import { LanguageProvider } from "@/lib/language-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

