"use client";

import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">{children}</div>
  );
}
