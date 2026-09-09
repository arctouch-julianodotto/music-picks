import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "My Fav Albums",
    template: "%s · My Fav Albums",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
