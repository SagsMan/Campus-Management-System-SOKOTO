import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import GlobalHooks from "./components/GlobalHooks";

export const metadata = {
  title: "Digital Queue System Sokoto",
  description:
    "A low-bandwidth digital queue system for student and visitor services at Sokoto campuses.",
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
