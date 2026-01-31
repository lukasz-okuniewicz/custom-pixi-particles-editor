import "@styles/globals.css";
import "@styles/tooltip.css";
import "@styles/menu.css";

export const metadata = {
  title: "Custom Pixi Particles",
  description: "Custom Pixi Particles",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans text-sm leading-relaxed text-[#c8c3bc] bg-[#181a1b] min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
