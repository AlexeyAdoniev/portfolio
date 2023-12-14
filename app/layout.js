import { Montserrat } from "next/font/google";
import "@/app/reset.css";
import "@/app/animations.css";
import "@/app/media.css";
import "@/app/globals.css";
import "@/public/fonts/fontawasome/css/fontawesome.min.css";
import "@/public/fonts/fontawasome/css/solid.min.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio | Alexey Adoniev",
  description: "Passionate developer and web artist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
