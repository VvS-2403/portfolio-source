import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vismay Vinayak Shanbhag — Portfolio",
  description:
    "B.E. Mathematics and Computing at BITS Pilani, Goa. Machine Learning, Data Science, RAG systems.",
  openGraph: {
    title: "Vismay Vinayak Shanbhag",
    description: "ML Engineer & Data Scientist — BITS Pilani",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
