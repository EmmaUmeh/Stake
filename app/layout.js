import { Work_Sans } from "next/font/google";
import "./globals.css";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Stake🚀",
  description: "Stake🚀",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}