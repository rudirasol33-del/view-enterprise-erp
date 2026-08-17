import type { Metadata } from "next";
import PWAProvider from "@/components/pwa/PWAProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VE One",
    template: "%s · VE One",
  },
  description: "The intelligent enterprise platform by View Enterprise.",
  applicationName: "VE One",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VE One",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <PWAProvider>{children}</PWAProvider>
      </body>
    </html>
  );
}
