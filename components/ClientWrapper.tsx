"use client";

import { useViewportHeight } from "@/components/hook/useViewportHeight";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  useViewportHeight();
  
  return <>{children}</>;
}