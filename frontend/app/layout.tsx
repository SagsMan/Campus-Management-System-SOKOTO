import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import GlobalHooks from "./components/GlobalHooks";

export const metadata = {
  title: "Digital Queue System Sokoto",
  description:
    "A low-bandwidth digital queue system for student and visitor services at Sokoto campuses.",
  icons: {
    icon: "/logo/udus-logo.jpg",
    shortcut: "/logo/udus-logo.jpg",
    apple: "/logo/udus-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalHooks />
          {children}
          <Toaster position="top-right" richColors closeButton/>
        </AuthProvider>
      </body>
    </html>
  );
}